/**
 * BaseController
 * 1.在controller里加入模板引擎
 * 2.对 post 和 URL 里的参数进行整理
 */
'use strict';

import { parse } from 'url';
import querystring from 'querystring';

import ViewEngine from './ViewEngine';

class BaseController extends ViewEngine{

    constructor(req, res) {
        super(req, res);
        //处理参数
        let queryObj = {};
        const urlObj = parse(req.url);
        const paramObj = querystring.parse(urlObj.query);
        try {
            const postObj = req.post ? querystring.parse(req.post) : {};       //url 参数
            Object.assign(queryObj, paramObj, postObj);
        } catch (err) {
            console.log(err);
            queryObj = paramObj;
        }
        this.params = queryObj;
    }

}

export default BaseController;