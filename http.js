'use strict';
var http = require('http'),
    fs = require('fs'),
    config = require('./config'),
    server = require('./server');

/*
 * http 方式的 redirect
 */
var http = require('http');
http.createServer(function (req, res) {
    var _postData = '';
    //on用于添加一个监听函数到一个特定的事件
    req.on('data', function (chunk) {
        _postData += chunk;
    }).on('end', function () {
        req.post = _postData;
        server.handlerRequest(req, res);
    });
}).listen(config.port_normal, config.host);