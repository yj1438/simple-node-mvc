var url = require('url'),
    path = require('path'),
    fs = require('fs'),
    options = require('../config.js'),
    contentTypes = require('./contentTypes'),
    httpError = require('./httpError');

module.exports = function (req, res, filePath) {
    'use strict';
    if (!filePath) {
        filePath = path.join(path.dirname(require.main.filename), options.staticFileDir, url.parse(req.url).pathname);
    }
    fs.exists(filePath, function (exists) {
        if (!exists) {
            httpError.handler404(req, res);
            return;
        }
        console.log(req.headers['accept-encoding']);
        fs.readFile(filePath, "binary", function (err, file) {
            if (err) {
                httpError.handler500(req, res, err);
                return;
            }
            var ext = path.extname(filePath);
            ext = ext ? ext.slice(1) : 'html';
            res.writeHead(200, {
                'Content-Type': contentTypes[ext] || 'text/html',
                //打开缓存
                'Cache-Control': 'public',
                'Expires': new Date(new Date().getTime() + (30*24*3600*1000))
                //测试，把静态的缓存去掉
//                'Cache-Control': 'no-cache',
//                'Expires': new Date()
            });
            res.write(file, "binary");
            res.end();
        });
    });
};