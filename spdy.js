var spdy = require('spdy'),
    fs = require('fs');
var config = require('./config'),
    server = require('./server');

var options = {
    key: fs.readFileSync('./SSL/localhost.key'),
    cert: fs.readFileSync('./SSL/localhost.crt')
};

var app = spdy.createServer(options, function (req, res) {
    var _postData = '';
    req.on('data', function (chunk) {
        _postData += chunk;
    }).on('end', function () {
        req.post = _postData;
        server.handlerRequest(req, res);
    });
}).listen(config.port2);

console.log('SPDY Server running at https://localhost:' + config.port2 + '/');
