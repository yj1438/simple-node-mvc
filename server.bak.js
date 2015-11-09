var url = require("url"),
    path = require("path"),
    fs = require("fs");
    
var config = require('./config'),
    routeMap = require('./route_map'),
    route = require('./route');

var template = require('art-template');
//template.config('base', __dirname+'\\views\\');

//exports.runServer = function(port){
//    port = port || 8080;
//    var server = http2.createServer(function(req, res){
//        var _postData = '';
//        //on用于添加一个监听函数到一个特定的事件
//        req.on('data', function(chunk){
//    	    _postData += chunk;
//    	}).on('end', function(){
//            req.post = querystring.parse(_postData);
//    	    handlerRequest(req, res);
//    	});
//        
//    }).listen(port);
//    
//    console.log('Server running at https://127.0.0.1:'+ port +'/');
//};



//如果有未处理的异常抛出，可以在这里捕获到
process.on('uncaughtException', function (err) {
    console.log(err);
});

var handler404 = function(req, res){
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Page Not Found');
};

var handler500 = function(req, res, err){
    res.writeHead(500, {'Content-Type': 'text/plain'});
    res.end(err);
};
/**
* 模板引擎
*/
var viewEngine = {
    render: function(req, res, viewName, context){
        var filename = path.join(__dirname, 'views', viewName);
        console.log(filename);
        try{
            //var output = Shotenjin.renderView(filename, context);
            var output = template(filename, context);
        }catch(err){
            handler500(req, res, err);
            return;
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(output);
    },
    renderJson: function(req, res, data){
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(data));
    }
};

//controller的上下文对象
var controllerContext = function(req, res){
    this.req = req;
    this.res = res;
    this.handler404 = handler404;
    this.handler500 = handler500;
};
controllerContext.prototype.render = function(viewName, context){
    viewEngine.render(this.req, this.res, viewName, context);
};
controllerContext.prototype.renderJson = function(json){
    viewEngine.renderJson(this.req, this.res, json);
};

/**
 * 所有请求的统一入口
 */
exports.handlerRequest = function (req, res) {
    //通过route来获取controller和action信息
    var actionInfo = route.getActionInfo(req.url, req.method);
    //如果route中有匹配的action，则分发给对应的action
    if(actionInfo.action){
        //假设controller都放到当前目录的controllers目录里面，还记得require是怎么搜索module的么？
        var controller = require('./controllers/'+actionInfo.controller); // ./controllers/blog
        if(controller[actionInfo.action]){
            var ct = new controllerContext(req, res);
            //动态调用，动态语言就是方便啊
            //通过apply将controller的上下文对象传递给action
            controller[actionInfo.action].apply(ct, actionInfo.args);
        }else{
            handler500(req, res, 'Error: controller "' + actionInfo.controller + '" without action "' + actionInfo.action + '"')
        }
    }else{
        //如果route没有匹配到，则当作静态文件处理
        staticFileServer(req, res);
    }
};

/*
* 静态资源请求入口
*/
var staticFileServer = function(req, res, filePath){
    if(!filePath){
        filePath = path.join(__dirname, routeMap.staticFileDir, url.parse(req.url).pathname);
    }
    fs.exists(filePath, function(exists) {  
        if(!exists) {  
            handler404(req, res);  
            return;  
        }  
  
        fs.readFile(filePath, "binary", function(err, file) {  
            if(err) {  
                handler500(req, res, err);
                return;  
            }
            
            var ext = path.extname(filePath);
            ext = ext ? ext.slice(1) : 'html';
            res.writeHead(200, {'Content-Type': contentTypes[ext] || 'text/html'});
            res.write(file, "binary");
            res.end();
        });  
    });
};
var contentTypes = 