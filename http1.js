/**
 * @author QLeelulu@gmail.com
 * @blog http://qleelulu.cnblogs.com
 */

var http = require('http'),
    config = require('./config'),
    server = require('./server');

var app = http.createServer(function(req, res){
        var _postData = '';
        //on用于添加一个监听函数到一个特定的事件
        req.on('data', function(chunk){
            _postData += chunk;
        }).on('end', function(){
            req.post = _postData;
            server.handlerRequest(req, res);
        });
    }).listen(config.port1);
    
console.log('HTTP/1.1 Server running at http://localhost:'+ config.port1 +'/');
