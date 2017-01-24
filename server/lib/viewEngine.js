/**
* 模板引擎
*/
'use strict';

import path from 'path';
import template from 'art-template';
import str2steam from 'string-to-stream';

import HttpBase from './HttpBase';

// 执行环境根目录
const basePath = process.cwd();

class ViewEngine extends HttpBase{

    constructor(req, res) {
        super(req, res);
    }

    // 渲染模板
    render(viewName, data) {
        let viewfile = path.join(basePath, 'server/views', viewName),
            output,
            strStream;
        try {
            output = template(viewfile, data);
            strStream = str2steam(output);
            this.out(strStream, 'html');
        } catch (err) {
            this._500(err.toString());
            return;
        }
    }
    // 输出JSON接口
    renderJson(data) {
        const callbackFnName = this.params.callback;
        let strStream;
        if (callbackFnName) {
            // jsonp 类型
            strStream = str2steam(callbackFnName + '(' + JSON.stringify(data) + ')');
        } else {
            strStream = str2steam(JSON.stringify(data));
        }
        this.out(strStream, 'json');
    }
}

export default ViewEngine;
