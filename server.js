var url_parse = require('url').parse,
    path = require('path'),
    querystring = require('querystring'),
    merge = require('merge');
var route = require('./lib/route'),
    route_map = require('./route_map'),
    httpError = require('./lib/httpError'),
    staticServer = require('./lib/staticServer'),
    viewEngine = require('./lib/viewEngine');

//===如果有未处理的异常抛出，可以在这里捕获到
//process.on('uncaughtException', function (err) {
//    console.log(err);
//});
//===

//controller的上下文对象
var ControllerContext = function (req, res) {
    var headers = req.headers,
        url = req.url,
        urlObj = url_parse(url),
        postObj,
        paramObj = {};
    try {
        paramObj = querystring.parse(urlObj.query);
        postObj = req.post ? querystring.parse(req.post) : {};
        paramObj = merge(paramObj, postObj);
    } catch (err) {
        console.log(err);
        console.log(paramObj);
    }
    this.req = req;
    this.res = res;
    this.params = paramObj;
    this.handler404 = httpError.handler404;
    this.handler500 = httpError.handler500;
};
ControllerContext.prototype.render = function (viewName, data) {
    viewName = path.join(path.dirname(require.main.filename), 'views', viewName);
    viewEngine.render(this.req, this.res, viewName, data);
};
ControllerContext.prototype.renderJson = function (json) {
    viewEngine.renderJson(this.req, this.res, json);
};

/**
 * 所有请求的统一入口
 */
exports.handlerRequest = function (req, res) {
    var actionInfo = route.getActionInfo(req.url, req.method);
    if (actionInfo.action) {
        var controller = require('./controllers/' + actionInfo.controller);
        if (controller[actionInfo.action]) {
            var controllerContext = new ControllerContext(req, res);
            controller[actionInfo.action].call(controllerContext);
        } else {
            httpError.handler500(req, res, 'ERROR: controller "' + actionInfo.controller + '" without action "' + actionInfo.action + '"');
        }
    } else {
        staticServer(req, res);
    }
};