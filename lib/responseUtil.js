var fs = require('fs'),
    path = require('path'),
    zlib = require('zlib');

var gzipTypes = ['html', 'json', 'js', 'css', 'xml'],
    config = require('../config');
/**
* response 方法
* 
* https://nodejs.org/api/zlib.html
* DOC 与 文件的输出不太一样，有待完成
*
*/
exports.response = function (req, res, con, type) {
    var type = type || 'html';
    
    
    
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
}