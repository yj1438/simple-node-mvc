
'use strict';
var https = require('https'),
    fs = require('fs'),
    config = require('./config'),
    server = require('./server');

var options = {
    key: fs.readFileSync('./SSL/3_www.h2statistics.ml.key'),
    cert: fs.readFileSync('./SSL/2_www.h2statistics.ml.crt'),
    ca: fs.readFileSync('./SSL/1_root_bundle.crt')
};

var app = https.createServer(options, function (req, res) {
        var _postData = '';
        //on用于添加一个监听函数到一个特定的事件
        req.on('data', function (chunk) {
            _postData += chunk;
        }).on('end', function () {
            req.post = _postData;
            server.handlerRequest(req, res);
        });
    }).listen(config.port_ssl, config.host, function () {
        console.log('http/1.1 Server running at https://' + config.host + ':' + config.port_ssl + '/');
    });

/*
 * http 方式的 redirect
 */
var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers.host + req.url });
    res.end();
}).listen(config.port_normal, config.host);