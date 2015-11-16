var fs = require('fs'),
    path = require('path'),
    zlib = require('zlib');

var gzipTypes = ['html', 'json', 'js', 'css', 'xml'],
    contentTypes = require('./contentTypes'),
    config = require('../config');
/**
* response 方法
* 
* https://nodejs.org/api/zlib.html
*
*/
exports.out = function (request, response, stream, type, headers) {
    var acceptEncoding = request.headers['accept-encoding'];
    type = type || 'html';
    headers['Content-Type'] = contentTypes[type] || 'text/html';
    if (config.gzip && gzipTypes.indexOf (type) > -1) {
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
}