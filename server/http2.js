'use strict';

import http2 from 'http2';
import http from 'http';

//
import config from './config';
import handlerRequest from './handlerRequest';



http2.createServer(config.certificate, function (req, res) {
    //server push 的例子，在频繁请求下会出错，还不清楚是什么情况
    /*
    if (req.url.indexOf('http2/demo') > -1 && res.push) {
        var push = res.push('/js/jquery-2.1.4.js');
        push.writeHead(200, {'content-type': 'text/javascript'});
        fs.createReadStream(path.join(__dirname, '/static/js/jquery-2.1.4.js')).pipe(push);
    }
    */
    handlerRequest(req, res);
}).listen(config.port_ssl, config.host, function () {
    console.log('HTTP/2 Server running at https://' + config.host + ':' + config.port_ssl + '/');
});

/*
 * http 方式的 redirect
 */
http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers.host + req.url });
    res.end();
}).listen(config.port_normal, config.host);
