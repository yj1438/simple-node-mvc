'use strict';
import spdy from 'spdy';
import fs from 'fs';

var config = require('./config'),
    server = require('./server');

var options = config.certificate;

var app = spdy.createServer(options, function (req, res) {
    //处理一般的 POST 数据 
    // 如果是 form-data 形的数据，用 multiparty 处理
    var _postData = '';
    req.on('data', function (chunk) {
        _postData += chunk;
    }).on('end', function () {
        req.post = _postData;
        server.handlerRequest(req, res);
    });
}).listen(config.port_ssl, config.host, function () {
    console.log('SPDY Server running at https://' + config.host + ':' + config.port_ssl + '/');
});

app.on('error', function (err) {
    this.emit("err");
});

/*
 * http 方式的 redirect
 */
var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers.host + req.url });
    res.end();
}).listen(config.port_normal, config.host);



