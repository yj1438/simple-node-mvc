'use strict';

import http from 'http';
//
import config from './config';
import handlerRequest from './handlerRequest';

/*
 * http 方式的 redirect
 */
http.createServer(function (req, res) {
    handlerRequest(req, res);
}).listen(config.port_ssl, config.host, () => {
    console.log('SPDY Server running at http://' + config.host + ':' + 80 + '/');
}).on('error', function (err) {
    this.emit(err);
});