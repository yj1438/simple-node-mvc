/**
 * BaseController
 * 1.在controller里加入模板引擎
 * 2.对 post 和 URL 里的参数进行整理
 */
'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require('path'),
    url_parse = require('url').parse,
    querystring = require('querystring'),
    viewEngine = require('./viewEngine'),
    httpError = require('./httpError');

var BaseController = function BaseController(req, res) {
    var headers = req.headers,
        url = req.url,
        urlObj = url_parse(url),
        postObj = void 0,
        paramObj = {};
    try {
        paramObj = querystring.parse(urlObj.query);
        postObj = req.post ? querystring.parse(req.post) : {};
        paramObj = (0, _assign2.default)(paramObj, postObj);
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

BaseController.prototype = viewEngine;

//BaseController.prototype.render = function (viewName, data) {
//    viewEngine.render.call(this, viewName, data);
//};
//BaseController.prototype.renderJson = function (json) {
//    viewEngine.renderJson.call(this, json);
//};

module.exports = BaseController;
//# sourceMappingURL=BaseController.js.map
