'use strict';

const fs = require('fs'),
    path = require('path'),
    zlib = require('zlib');

const gzipTypes = ['html', 'json', 'js', 'css', 'xml'],
    contentTypes = require('./contentTypes'),
    config = require('../config');
/**
* response 方法
* 主要用于最终数据流的输出
* 可根据浏览器端进行 deflate or gzip 的压缩
* https://nodejs.org/api/zlib.html
*
*/
exports.out = function (stream, type, headers) {
    
    const request = this.req,
        response = this.res,
        acceptEncoding = request.headers['accept-encoding'];
    type = type || 'html';
    headers['Content-Type'] = contentTypes[type] || 'text/html';
    if (config.gzip && typeof acceptEncoding === 'string' && gzipTypes.indexOf (type) > -1) {
        if (acceptEncoding.match(/\bdeflate\b/)) {
            headers['Content-encoding'] = 'deflate';
            response.writeHead(200, headers);
            stream.pipe(zlib.createDeflate()).pipe(response);
        } else if (acceptEncoding.match(/\bgzip\b/)) {
            headers['Content-encoding'] = 'gzip';
            response.writeHead(200, headers);
            stream.pipe(zlib.createGzip()).pipe(response);
        } else {
            response.writeHead(200, headers);
            stream.pipe(response);
        }
    } else {
        response.writeHead(200, headers);
        stream.pipe(response);
    }
    stream.on('finish',response.end);
};