/**
 * BaseController
 * 1.在controller里加入模板引擎
 * 2.对 post 和 URL 里的参数进行整理
 */
'use strict';

import { parse } from 'url';
import querystring from 'querystring';

import ViewEngine from './viewEngine';

class BaseController extends ViewEngine{

    constructor(req, res) {
        super(req, res);
        //处理参数
        // url query 参数
        const urlObj = parse(req.url),
            paramObj = querystring.parse(urlObj.query);
        this.params = paramObj;
        // post 参数
        try {
            let postObj = req.post;
            if (Object.prototype.toString.call(postObj) === '[object Object]') {
                // multipart 类型
            } else {
                postObj = postObj ? querystring.parse(postObj) : {};
            }
            this.post = postObj;
        } catch (err) {
            console.log(err);
        }
        // files
        this.files = req.files;
    }

}

export default BaseController;