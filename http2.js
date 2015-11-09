var https = require('http2'),
    fs = require('fs');
var config = require('./config'),
    server = require('./server');

var options = {
    key: fs.readFileSync('./SSL/localhost.key'),
    cert: fs.readFileSync('./SSL/localhost.crt')
};

var app = require('http2').createServer(options, function (req, res) {
        var _postData = '';
        //on用于添加一个监听函数到一个特定的事件
        req.on('data', function(chunk){
            _postData += chunk;
        }).on('end', function(){
            req.post = _postData;
            server.handlerRequest(req, res);
        });
    }).listen(config.port2);

console.log('HTTP/2 Server running at https://localhost:' + config.port2 + '/');