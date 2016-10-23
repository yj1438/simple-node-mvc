'use strict';

import http from 'http';
//
import config from './config';
import handlerRequest from './handlerRequest';

/*
 * http 方式的 redirect
 */
http.createServer(function (req, res) {
    let _postData = '';
    //on用于添加一个监听函数到一个特定的事件
    req.on('data', function (chunk) {
        _postData += chunk;
    }).on('end', function () {
        req.post = _postData;
        handlerRequest(req, res);
    });
}).listen(config.port_ssl, config.host, () => {
    console.log('SPDY Server running at http://' + config.host + ':' + 80 + '/');
}).on('error', function (err) {
    this.emit(err);
});