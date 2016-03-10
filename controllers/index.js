'use strict';
const request = require('request'),
      fs = require('fs'),
      crypto = require('crypto'),
      CtrCache = require('../common/CtrCache');

const http2Service = require('../service/http2Service'),
      refService = require('../service/refService');

const protocolMap = {
    '1': 'http 1.x',
    '2': 'spdy/2',
    '3': 'spdy/3',
    '3.1': 'spdy/3.1',
    '4': 'http 2'
};

let uaDataStore = new CtrCache();

/*
 * 生成格式化的 uaData
 * 包括 UA 的识别
 1:
 * API KEY ea731ec4
 * UA_PARSE_URL = 'http://useragentapi.com/api/v3/json/ea731ec4/' + encodeURIComponent(userAgent);
 2:
 * UA_PARSE_URL = 'http://www.useragentstring.com/?uas=' + encodeURIComponent(userAgent) + '&getJSON=all';
 */
function makeUaData (userAgent, callback) {
    let data = {},
        uaData = {};
    
    const UA_PARSE_URL = 'http://www.useragentstring.com/?uas=' + encodeURIComponent(userAgent) + '&getJSON=all';
    
    request(UA_PARSE_URL, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            uaData = JSON.parse(body);
            //组装 data
            data.ua_string = userAgent;
            data.os_name = uaData["os_name"];
            data.os_version = uaData["os_versionNumber"];
            data.agent_name = uaData["agent_name"];
            data.agent_version = uaData["agent_version"];
            //处理特殊 UA
            let uaMatch = userAgent.match(/(UCBrowser)\/([\d.]+)/)                          //UC
                || userAgent.match(/(MicroMessenger)\/([\d.]+)/)                    //微信
                || userAgent.match(/(MQQBrowser)\/([\d.]+)/)                        //QQ
                || userAgent.match(/(baidubrowser)\/([\d.]+)/)                      //baidu
                || userAgent.match(/(baiduboxapp)\/([\d.]+)/)                      //baidubox
                || userAgent.match(/(LieBaoFast)\/([\d.]+)/)                        //猎豹
                || userAgent.match(/(SogouMobileBrowser)\/([\d.]+)/)                //搜狗
                || userAgent.match(/(360 Aphone Browser) \(([\d.]+)\)/);            //360
            if (uaMatch) {
                data.agent_name = uaMatch[1];
                data.agent_version = uaMatch[2];
            } else if (data.agent_name === 'Android Webkit Browser') {
                //泛 chrome 浏览器
                if (uaMatch = userAgent.match(/Chrome\/([\d.]+)/)) {
                    data.agent_name = 'Chrome';
                    data.agent_version = uaMatch[1];
                }
                //android browser
                if (uaMatch = userAgent.match(/Version\/([\d.]+)/)) {
                    data.agent_name = 'Android Browser';
                    data.agent_version = data.agent_version + ', ' + uaMatch[1]; 
                }
                //webview
                if (uaMatch = userAgent.match(/wv/)) {
                    data.agent_name = 'Android Webview';
                }
            }
            callback(data);
        } else {
            callback(null);
        }
    });
}

/**
 * 
 */
exports.index = function () {
    
    //this.renderJson(this.params);
    let self_req = this.req,
        data = {},
        userAgent = this.req.headers['user-agent'],
        //API KEY ea731ec4
        //UA_PARSE_URL = 'http://useragentapi.com/api/v3/json/ea731ec4/' + encodeURIComponent(userAgent);
        UA_PARSE_URL = 'http://www.useragentstring.com/?uas=' + encodeURIComponent(userAgent) + '&getJSON=all';
    
    //制作 HASHID
    let hashId;
    try {
        let hash = crypto.createHash('sha256');
        hash.update(userAgent);
        hashId = hash.digest('hex');
    } catch (err) {
        //throw err;
        console.log(new Date() + ": " + userAgent);
        hashId = null;
    }
    
    //如果没有获得 HASHID，说明是非正常浏览器的访问，可直接返回
    if (!hashId) {
        this.renderJson({info: userAgent, message: 'userAgent 无法识别'});
        return;
    }
    
    //进行去重性的添加
    if (uaDataStore.has(hashId)) {
        //console.log('正在处理' + hashId + '...');
    } else {
        uaDataStore.add(hashId);
        http2Service.findByHashid(hashId, (err, rows) => {
            if (err) {
                uaDataStore.remove(hashId);
                console.log(err);
                //this.handler500(this.req, this.res, err);
            } else {
                if (!rows || rows.length === 0) {
                    /*
                     * 此处有问题，从 AG 网站请求回来的间隙内有可能有一样 hash_id 的请求到来
                     * 此时还没有入表，所以会造成重复 hash_id 入表的情况
                     * 所以有了uaDataStore
                     */
                    makeUaData(userAgent, (uaData) => {
                        if (!uaData) {
                            uaDataStore.remove(hashId);
                            return;
                        }
                        //补充其它信息
                        uaData.hash_id = hashId;
                        uaData.is_spdy = this.req.isSpdy ? 1 : 0;
                        uaData.protocol = protocolMap[this.req.spdyVersion];
                        uaData.ctr = uaDataStore.getCTR(hashId);
                        http2Service.add(uaData, (err, result) => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(result.insertId + '+++' + hashId);
                            }
                            uaDataStore.remove(hashId);
                        });
                    });
                } else {
                    http2Service.addCTR(hashId, uaDataStore.getCTR(hashId));
                    uaDataStore.remove(hashId);
                    //是否将已有的这个记录加点击
                }
            }
        });
    }
    
    /*
     * 对来源 ref 进行统计
     */
    let ref = this.params.ref ? decodeURIComponent(this.params.ref) : null;
    if (ref) {
        //制作 HASHID
        let refId, refData = {};
        try {
            let hash = crypto.createHash('sha256');
            hash.update(ref);
            refId = hash.digest('hex');
        } catch (err) {
            //throw err;
            refId = null;
        }
        if (refId) {
            refData.id = refId;
            refData.ref = ref;
            refData.protocol = this.req.spdyVersion;
            refService.addCTR(refData);
        }
    }
    
    data.title = "Welcome to HTTP/2 statistics";
    data.userAgent = userAgent;
    data.isSpdy = '当前客户端' + (this.req.isSpdy ? '支持' : '不支持') + ' SPDY/H2 !!!';
    data.protocol = protocolMap[this.req.spdyVersion];
    this.render('index/index', data);
};
