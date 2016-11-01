'use strict';
import spdy from 'spdy';
import http from 'http';
import multiparty from 'multiparty';
import util from 'util';
//
import config from './config';
import handlerRequest from './handlerRequest';

spdy.createServer(config.certificate, (req, res) => {
    //处理一般的 POST 数据 
    // 如果是 form-data 形的数据，用 multiparty 处理
    if (req.method.toLowerCase() === 'post' && req.headers['content-type'] === 'multipart/form-data') {
        const form = new multiparty.Form();
        form.parse(req, (err, fields, files) => {
            if (err) {
                res.end(util.inspect(err));
                return;
            }
            res.writeHead(200, {'content-type': 'text/plain'});
            res.write('received upload:\n\n');
            res.end(util.inspect({fields: fields, files: files}));
        });
        return;
    }
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



