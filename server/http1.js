
'use strict';
import http from 'http';
import https from 'https';
//
import config from './config';
import handlerRequest from './handlerRequest';


https.createServer(config.certificate, function (req, res) {
    let _postData = '';
    //on用于添加一个监听函数到一个特定的事件
    req.on('data', function (chunk) {
        _postData += chunk;
    }).on('end', function () {
        req.post = _postData;
        handlerRequest(req, res);
    });
}).listen(config.port_ssl, config.host, function () {
    console.log('http/1.1 Server running at https://' + config.host + ':' + config.port_ssl + '/');
});

/*
 * http 方式的 redirect
 */
http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers.host + req.url });
    res.end();
}).listen(config.port_normal, config.host);