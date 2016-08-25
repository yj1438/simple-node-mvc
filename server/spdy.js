'use strict';
import spdy from 'spdy';
import http from 'http';
import fs from 'fs';

//
import config from './config';
import handlerRequest from './handlerRequest';

spdy.createServer(config.certificate, (req, res) => {
    //处理一般的 POST 数据 
    // 如果是 form-data 形的数据，用 multiparty 处理
    let _postData = '';
    req.on('data', (chunk) => {
        _postData += chunk;
    }).on('end', () => {
        req.post = _postData;
        handlerRequest(req, res);
    });
}).listen(config.port_ssl, config.host, () => {
    console.log('SPDY Server running at https://' + config.host + ':' + config.port_ssl + '/');
}).on('error', function (err) {
    this.emit("err");
});

/*
 * http 方式的 redirect
 */
http.createServer((req, res) => {
    res.writeHead(301, { "Location": "https://" + req.headers.host + req.url });
    res.end();
}).listen(config.port_normal, config.host);



