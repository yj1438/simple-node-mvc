'use strict';
const request = require('request'),
    fs = require('fs'),
    crypto = require('crypto');

const protocolMap = {
    '1': 'http 1.x',
    '2': 'spdy/2',
    '3': 'spdy/3',
    '3.1': 'spdy/3.1',
    '4': 'http 2'
};

function makeUaData (uaData, userAgent) {
    let data = {};
    let uaMatch;
    data.uaString = userAgent;
    data.os_name = uaData["os_name"];
    data.os_version = uaData["os_versionNumber"];
    data.agent_name = uaData["agent_name"];
    data.agent_version = uaData["agent_version"];
    /*
     * 处理特殊容器
     */
    //UC
    uaMatch = userAgent.match(/(UCBrowser)\/([\d.]+)/)                          //UC
            || userAgent.match(/(MicroMessenger)\/([\d.]+)/)                    //微信
            || userAgent.match(/(MQQBrowser)\/([\d.]+)/)                        //QQ
            || userAgent.match(/(baidubrowser)\/([\d.]+)/)                      //baidu
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
    return data;
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
    
    //取 HASH
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
    
    if (!hashId) {
        this.renderJson({info: userAgent});
        return;
    }

    //ua hash 进行过滤
    fs.readFile('data/hash.json', 'utf8', (err, data) => {
        if (err) {
            throw err;
            return;
        }
        if (!data || data.indexOf(hashId) === -1) {
            console.log('add new userAgent : ' + hashId);
            request(UA_PARSE_URL, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    let uaData = makeUaData(JSON.parse(body), userAgent);
                    uaData.hashId = hashId;
                    uaData.isSpdy = self_req.isSpdy ? 'yes' : 'no';
                    uaData.protocol = protocolMap[self_req.spdyVersion];
                    //写信息
                    fs.appendFile('data/ua_data.json', JSON.stringify(uaData) + '\n', 'utf8', (err) => {
                        if (err)
                            throw err;
                    });
                    //写 hashId
                    fs.appendFile('data/hash.json', hashId + "\n", 'utf8', (err) => {
                        if (err) {
                            throw err;
                        }
                    });
                }
            });
            /*
            fs.appendFile('data/userAgent.json', hashId + '\n' + userAgent + '\n', 'utf8', (err) => {
                if (err)
                    throw err;
            });
            */
        }
    });
    
    data.title = "Welcome to HTTP/2 statistics";
    data.userAgent = userAgent;
    data.isSpdy = '当前客户端' + (this.req.isSpdy ? '支持' : '不支持') + ' SPDY/H2 !!!';
    data.protocol = protocolMap[this.req.spdyVersion];
    this.render('index/index', data);
};
