'use strict';

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
 * 所有请求的统一入口
 */
export default (req, res) => {
    const actionInfo = route.getActionInfo(req.url, req.method);
    if (actionInfo.controller && actionInfo.action) {
        const Controller = require('./controllers/' + actionInfo.controller);
        console.log(Controller);
        try {


            const controllerContext = new Controller.default(req, res);
            controllerContext[actionInfo.action]();
            // const controllerContext = new BaseController(req, res);
            // controller[actionInfo.action].call(controllerContext);
        } catch (err) {
            console.log(err);
            httpError.handler500(req, res, 'ERROR: controller "' + actionInfo.controller + '" without action "' + actionInfo.action + '"');
        }
    } else {
        const staticContent = new StaticContent(req, res);
        staticContent.handle();
    }
} 