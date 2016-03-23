/**
 * BaseController
 * 1.在controller里加入模板引擎
 * 2.对 post 和 URL 里的参数进行整理
 */
'use strict';

const path = require('path'),
    url_parse = require('url').parse,
    querystring = require('querystring'),
    viewEngine = require('./viewEngine'),
    httpError = require('./httpError');

const BaseController = function (req, res) {
    let headers = req.headers,
        url = req.url,
        urlObj = url_parse(url),
        postObj,
        paramObj = {};
    try {
        paramObj = querystring.parse(urlObj.query);
        postObj = req.post ? querystring.parse(req.post) : {};
        paramObj = Object.assign(paramObj, postObj);
    } catch (err) {
        console.log(err);
        console.log(paramObj);
    }
    this.req = req;
    this.res = res;
    this.params = paramObj;
    this.handler404 = httpError.handler404;
    this.handler500 = httpError.handler500;
}

BaseController.prototype = viewEngine;

//BaseController.prototype.render = function (viewName, data) {
//    viewEngine.render.call(this, viewName, data);
//};
//BaseController.prototype.renderJson = function (json) {
//    viewEngine.renderJson.call(this, json);
//};

module.exports = BaseController;