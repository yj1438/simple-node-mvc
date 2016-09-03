'use strict';

import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

import contentTypes from './contentTypes';
import HttpError from './httpError';
import config from '../config';

const gzipTypes = ['html', 'json', 'js', 'css', 'xml'];
/**
* response 方法
* 主要用于最终数据流的输出
* 可根据浏览器端进行 deflate or gzip 的压缩
* https://nodejs.org/api/zlib.html
*
*/
class HttpBase {

    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    _404() {
        HttpError.handler404(this.req, this,res);
    }

    _500() {
        HttpError.handler500(this.req, this,res);
    }

    /**
     * stream 要输出的内容(流)
     * type 内容类型
     * headers 自定义头
     */
    out(stream, type = 'html', headers = {}) {
        headers['Content-Type'] = contentTypes[type] || 'text/plain';
        const acceptEncoding = this.req.headers['accept-encoding'];
        // 如果 配置打开 gzip 浏览器请求兼容 压缩
        if (config.gzip && typeof acceptEncoding === 'string' && gzipTypes.indexOf (type) > -1) {
            if (acceptEncoding.match(/\bdeflate\b/)) {
                headers['Content-encoding'] = 'deflate';
                this.res.writeHead(200, headers);
                stream.pipe(zlib.createDeflate()).pipe(this.res);
            } else if (acceptEncoding.match(/\bgzip\b/)) {
                headers['Content-encoding'] = 'gzip';
                this.res.writeHead(200, headers);
                stream.pipe(zlib.createGzip()).pipe(this.res);
            } else {
                this.res.writeHead(200, headers);
                stream.pipe(this.res);
            }
        } else {
            this.res.writeHead(200, headers);
            stream.pipe(this.res);
        }
        stream.on('finish',this.res.end);
    } 
}

export default HttpBase;
