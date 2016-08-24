'use strict';

var _spdy = require('spdy');

var _spdy2 = _interopRequireDefault(_spdy);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = require('./config'),
    server = require('./server');

var options = config.certificate;

var app = _spdy2.default.createServer(options, function (req, res) {
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
//# sourceMappingURL=spdy.js.map
