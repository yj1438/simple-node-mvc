'use strict';
import spdy from 'spdy';
import http from 'http';
//
import config from './config/config';
import handlerRequest from './lib/handlerRequest';

spdy.createServer(config.certificate, (req, res) => {
    handlerRequest(req, res);
}).listen(config.port_ssl, config.host, () => {
    console.log('SPDY Server running at https://' + config.host + ':' + config.port_ssl + '/');
}).on('error', function (err) {
    console.log(err);
    // this.emit(err);
});

/*
 * http 方式的 redirect
 */
http.createServer((req, res) => {
    res.writeHead(302, { "Location": "https://" + req.headers.host + req.url });
    res.end();
}).listen(config.port_normal, config.host);