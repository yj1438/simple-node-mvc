var http2 = require('http2'),
    fs = require('fs'),
    path = require('path');
var config = require('./config'),
    server = require('./server');

var options = {
    key: fs.readFileSync('./SSL/localhost.key'),
    cert: fs.readFileSync('./SSL/localhost.crt')
};

var app = http2.createServer(options, function (req, res) {
    var _postData = '';
    //on用于添加一个监听函数到一个特定的事件
    if (req.url.indexOf('/demo') > -1 && res.push) {
        var push = res.push('/js/jquery-2.1.4.js');
        push.writeHead(200,{'content-type': 'text/javascript'});
        fs.createReadStream(path.join(__dirname, '/static/js/jquery-2.1.4.js')).pipe(push);
    }
    req.on('data', function (chunk) {
        _postData += chunk;
    }).on('end', function () {
        req.post = _postData;
        //server push 的例子，在频繁请求下会出错，还不清楚是什么情况
//        if (req.url.indexOf('index/') > -1 && res.push) {
//            var push = res.push('/js/jquery-1.11.1.min.js');
//            push.writeHead(200,{'content-type': 'text/javascript'});
//            fs.createReadStream(path.join(__dirname, '/static/js/jquery-1.11.1.min.js')).pipe(push);
//        }
        server.handlerRequest(req, res);
    });
}).listen(config.port2);

console.log('HTTP/2 Server running at https://localhost:' + config.port2 + '/');
