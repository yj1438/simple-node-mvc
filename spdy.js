'use strict';
var spdy = require('spdy'),
    fs = require('fs');

var config = require('./config'),
    server = require('./server');

var options = {
    key: fs.readFileSync('./SSL/3_www.h2statistics.ml.key'),
    cert: fs.readFileSync('./SSL/2_www.h2statistics.ml.crt'),
    ca: fs.readFileSync('./SSL/1_root_bundle.crt')
};

var app = spdy.createServer(options, function (req, res) {
    //
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

//app.on('socket', function (socket) {
//    console.log(socket.npnProtocol || socket.alpnProtocol);
//});
          
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



