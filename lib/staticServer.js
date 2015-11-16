var url = require('url'),
    path = require('path'),
    fs = require('fs'),
    zlib = require('zlib'),
    config = require('../config.js'),
    httpError = require('./httpError'),
    responseUtil = require('./responseUtil');

module.exports = function (req, res, filePath) {
    'use strict';
    if (!filePath) {
        filePath = path.join(path.dirname(require.main.filename), config.staticFileDir, url.parse(req.url).pathname);
    }
    fs.exists(filePath, function (exists) {
        var acceptEncoding = req.headers['accept-encoding'],
            fileStream,
            resHeaders = {
                //测试，把静态的缓存去掉
                'Cache-Control': 'no-cache',
                'Expires': new Date()
            },
            extName;
        if (!exists) {
            httpError.handler404(req, res);
            return;
        }
        //打开缓存
        if (config.cacheControl > 0) {
            resHeaders['Cache-Control'] = 'public';
            resHeaders['Expires'] = new Date(new Date().getTime() + (config.cacheControl * 1000));
        }
        try {
            fileStream = fs.createReadStream(filePath);
            extName = path.extname(filePath);
            extName = extName ? extName.slice(1) : 'html';
            responseUtil.out (req, res, fileStream, extName, resHeaders);
        } catch (err) {
            httpError.handler500(req, res, err);
            return;
        }
    });
};