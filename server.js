'use strict';

var BaseController = require('./lib/BaseController'),
    route = require('./lib/route'),
    httpError = require('./lib/httpError'),
    StaticContent = require('./lib/StaticContent');

//===如果有未处理的异常抛出，可以在这里捕获到
//process.on('uncaughtException', function (err) {
//    console.log(err);
//});
//===

/**
 * 所有请求的统一入口
 */
exports.handlerRequest = function (req, res) {
    var actionInfo = route.getActionInfo(req.url, req.method);
    if (actionInfo.action) {
        var controller = require('./controllers/' + actionInfo.controller);
        if (controller[actionInfo.action]) {
            var controllerContext = new BaseController(req, res);
            controller[actionInfo.action].call(controllerContext);
        } else {
            httpError.handler500(req, res, 'ERROR: controller "' + actionInfo.controller + '" without action "' + actionInfo.action + '"');
        }
    } else {
        var staticContent = new StaticContent(req, res);
        staticContent.handle();
    }
};