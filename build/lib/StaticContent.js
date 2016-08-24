'use strict';

var url = require('url'),
    path = require('path'),
    fs = require('fs'),
    zlib = require('zlib'),
    config = require('../config'),
    httpError = require('./httpError'),
    responseUtil = require('./responseUtil');

var StaticContent = function StaticContent(req, res) {
    this.req = req;
    this.res = res;
};

StaticContent.prototype.output = responseUtil.out;

StaticContent.prototype.handle = function (filePath) {
    if (!filePath) {
        filePath = path.join(process.cwd(), config.staticFileDir, url.parse(this.req.url).pathname);
    }
    //进行目录权限的判断
    var relativePath = path.relative(path.join(process.cwd(), config.staticFileDir), filePath);
    if (relativePath.indexOf('..') > -1) {
        httpError.handler404(this.req, this.res);
        return;
    }
    //如是不存在或不是文件
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        httpError.handler404(this.req, this.res);
        return;
    }

    //
    var fileStream = void 0,
        resHeaders = {},
        extName = void 0;

    //打开缓存
    if (config.cacheControl && config.cacheControl > 0) {
        resHeaders['Cache-Control'] = 'max-age=' + config.cacheControl;
        resHeaders['Expires'] = new Date(new Date().getTime() + config.cacheControl * 1000);
    } else {
        resHeaders = {
            //把静态的缓存去掉
            'Cache-Control': 'no-cache',
            'Expires': new Date()
        };
    }
    try {
        fileStream = fs.createReadStream(filePath);
        extName = path.extname(filePath);
        extName = extName ? extName.slice(1) : 'html';
        this.output(fileStream, extName, resHeaders);
    } catch (err) {
        httpError.handler500(this.req, this.res, err);
        return;
    }
};

module.exports = StaticContent;
//# sourceMappingURL=StaticContent.js.map
