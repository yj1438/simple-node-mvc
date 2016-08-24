'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.handlerRequest = handlerRequest;

var _BaseController = require('./lib/BaseController');

var _BaseController2 = _interopRequireDefault(_BaseController);

var _route = require('./lib/route');

var _route2 = _interopRequireDefault(_route);

var _httpError = require('./lib/httpError');

var _httpError2 = _interopRequireDefault(_httpError);

var _StaticContent = require('./lib/StaticContent');

var _StaticContent2 = _interopRequireDefault(_StaticContent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//===如果有未处理的异常抛出，可以在这里捕获到
//process.on('uncaughtException', function (err) {
//    console.log(err);
//});
//===

/**
 * 所有请求的统一入口
 */
function handlerRequest(req, res) {
    var actionInfo = _route2.default.getActionInfo(req.url, req.method);
    if (actionInfo.action) {
        var controller = require('./controllers/' + actionInfo.controller);
        if (controller[actionInfo.action]) {
            var controllerContext = new _BaseController2.default(req, res);
            controller[actionInfo.action].call(controllerContext);
        } else {
            _httpError2.default.handler500(req, res, 'ERROR: controller "' + actionInfo.controller + '" without action "' + actionInfo.action + '"');
        }
    } else {
        var staticContent = new _StaticContent2.default(req, res);
        staticContent.handle();
    }
}
//# sourceMappingURL=server.js.map
