var url = require('url'),
    path = require('path'),
    fs = require('fs'),
    zlib = require('zlib'),
    options = require('../config.js'),
    contentTypes = require('./contentTypes'),
    httpError = require('./httpError');

module.exports = function (req, res, filePath) {
    'use strict';
    if (!filePath) {
        filePath = path.join(path.dirname(require.main.filename), options.staticFileDir, url.parse(req.url).pathname);
    }
    fs.exists(filePath, function (exists) {
        var acceptEncoding = req.headers['accept-encoding'],
            fileStream,
            resHeaders = {
                //打开缓存
                //'Cache-Control': 'public',
                //'Expires': new Date(new Date().getTime() + (30*24*3600*1000))
                //测试，把静态的缓存去掉
                'Cache-Control': 'no-cache',
                'Expires': new Date()
            },
            extName;
        if (!exists) {
            httpError.handler404(req, res);
            return;
        }
        try {
            fileStream = fs.createReadStream(filePath);
            extName = path.extname(filePath);
            extName = extName ? extName.slice(1) : 'html';
            resHeaders['Content-Type'] = contentTypes[extName] || 'text/html';
            if (acceptEncoding.match(/\bdeflate\b/)) {
                resHeaders['Content-encoding'] = 'deflate';
                res.writeHead(200, resHeaders);
                fileStream.pipe(zlib.createDeflate()).pipe(res);
            } else if (acceptEncoding.match(/\bgzip\b/)) {
                resHeaders['Content-encoding'] = 'gzip';
                res.writeHead(200, resHeaders);
                fileStream.pipe(zlib.createGzip()).pipe(res);
            } else {
                res.writeHead(200, resHeaders);
                fileStream.pipe(res);
            }
        } catch (err) {
            httpError.handler500(req, res, err);
            return;
        } finally {
            fileStream.on('finish',res.end);
            //res.end();
        }
        
    });
};