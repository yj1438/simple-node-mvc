/**
 * BaseController
 * 1.在controller里加入模板引擎
 * 2.对 post 和 URL 里的参数进行整理
 */
'use strict';

import path from 'path';
import { parse } from 'url';
import querystring from 'querystring';

import ViewEngine from './viewEngine';
import { handler404, handler500} from './httpError';

class BaseController extends ViewEngine{

    constructor(req, res) {
        super(req, res);
        this.req = req;
        this.res = res;
        //处理参数
        let queryObj = {};
        try {
            const urlObj = parse(req.url);
            const paramObj = querystring.parse(urlObj.query),
                postObj = req.post ? querystring.parse(req.post) : {};       //url 参数
            Object.assign(queryObj, urlObj, postObj);
        } catch (err) {
            console.log(err);
            queryObj = paramObj;
        }
        this.params = queryObj;
        //
        this.handler404 = handler404;
        this.handler500 = handler500;
    }

}

// const BaseController = function (req, res) {
//     let headers = req.headers,
//         url = req.url,
//         urlObj = url_parse(url),
//         postObj,
//         paramObj = {};
//     try {
//         paramObj = querystring.parse(urlObj.query);
//         postObj = req.post ? querystring.parse(req.post) : {};
//         paramObj = Object.assign(paramObj, postObj);
//     } catch (err) {
//         console.log(err);
//         console.log(paramObj);
//     }
//     this.req = req;
//     this.res = res;
//     this.params = paramObj;
//     this.handler404 = httpError.handler404;
//     this.handler500 = httpError.handler500;
// };

// BaseController.prototype = viewEngine;

//BaseController.prototype.render = function (viewName, data) {
//    viewEngine.render.call(this, viewName, data);
//};
//BaseController.prototype.renderJson = function (json) {
//    viewEngine.renderJson.call(this, json);
//};

export default BaseController;