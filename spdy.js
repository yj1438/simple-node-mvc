var spdy = require('spdy'),
    str2steam = require('string-to-stream'),
    fs = require('fs');

var config = require('./config'),
    server = require('./server');

var options = {
    key: fs.readFileSync('./SSL/4_user_www.h2statistics.ml.key'),
    cert: fs.readFileSync('./SSL/3_user_www.h2statistics.ml.crt'),
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
}).listen(config.port_ssl, config.host);

//app.on('socket', function (socket) {
//    console.log(socket.npnProtocol || socket.alpnProtocol);
//});

app.on('error', function (err){
    this.emit("err");
});

//app.listen(config.port_ssl);
console.log('SPDY Server running at https://' + config.host + ':' + config.port_ssl + '/');
