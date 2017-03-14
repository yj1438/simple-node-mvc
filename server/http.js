'use strict';

import http from 'http';
//
import config from './config/config';
import handlerRequest from './lib/handlerRequest';

/*
 * http 方式的 redirect
 */
http.createServer((req, res) => {
    handlerRequest(req, res);
}).listen(config.port_normal, config.host, () => {
    console.log('SPDY Server running at http://' + config.host + ':' + config.port_normal + '/');
}).on('error', (err) => {
    console.log(err);
    throw err;
    // this.emit(err);
});