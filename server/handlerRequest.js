'use strict';

import multiparty from 'multiparty';

import route from './lib/route';
import httpError from './lib/httpError';
import StaticContent from './lib/StaticContent';

// import Index from './controllers/index';

//===如果有未处理的异常抛出，可以在这里捕获到
//process.on('uncaughtException', function (err) {
//    console.log(err);
//});
//===


/**
 * 组装 post 时提交的数据
 * 这里区分了一下 form-data 和 x-www-form-urlencoded 的两种形式
 * @param {any} req
 * @returns Promise
 */
function makePostData(req) {
    return new Promise((resolve, reject) => {
        if (req.method.toLowerCase() === 'post' && req.headers['content-type'] === 'multipart/form-data') {
            // 如果是 form-data 形的数据，用 multiparty 处理
            const form = new multiparty.Form();
            form.parse(req, (err, fields, files) => {
                if (err) {
                    reject(err);
                }
                req.post = fields;          // 此时的 post 是 object
                req.files = files;
                resolve(req);
            });
        } else {
            //处理一般的 x-www-form-urlencoded POST 类型数据 
            let _postData = '';
            req.on('data', (chunk) => {
                _postData += chunk;
            }).on('end', () => {
                req.post = _postData;           // 此时的 post 是 string
                resolve(req);
            });
        }
    });
}

/**
 * 所有请求的统一入口
 */
export default async (req, res) => {
    /**
     * 生成 post 的数据;
     */
    let _req;
    try {
        _req = await makePostData(req);
    } catch (err) {
        _req = null;
    }
    if (!_req) {
        httpError.handler500(req, res, 'ERROR: request Data error!');
        return;
    }
    /*
     * 指定对应的controller
     */
    const actionInfo = route.getActionInfo(req.url, req.method);
    if (actionInfo.controller && actionInfo.action) {
        const Controller = require('./controllers/' + actionInfo.controller);
        try {
            /**
             * 這個地方有點糾結，也是整個ES6換的最LOW的地方
             * babel 構建後 require 的是已經改變過後的 class
             * 所以這個地方需要 new Controller.default 而不是正常的 new Controller
             */
            const controllerContext = new Controller.default(_req, res);
            controllerContext[actionInfo.action]();
        } catch (err) {
            console.log(err);
            httpError.handler500(req, res, 'ERROR: controller "' + actionInfo.controller + '" without action "' + actionInfo.action + '"');
        }
    } else {
        const staticContent = new StaticContent(req, res);
        staticContent.handle();
    }
} 