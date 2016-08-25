'use strict';

import BaseController from './lib/BaseController';
import route from './lib/route';
import httpError from './lib/httpError';
import StaticContent from './lib/StaticContent';

//===如果有未处理的异常抛出，可以在这里捕获到
//process.on('uncaughtException', function (err) {
//    console.log(err);
//});
//===

/**
 * 所有请求的统一入口
 */
export default (req, res) => {
    const actionInfo = route.getActionInfo(req.url, req.method);
    if (actionInfo.action) {
        const controller = require('./controllers/' + actionInfo.controller);
        if (controller[actionInfo.action]) {
            const controllerContext = new BaseController(req, res);
            controller[actionInfo.action].call(controllerContext);
        } else {
            httpError.handler500(req, res, 'ERROR: controller "' + actionInfo.controller + '" without action "' + actionInfo.action + '"');
        }
    } else {
        const staticContent = new StaticContent(req, res);
        staticContent.handle();
    }
} 