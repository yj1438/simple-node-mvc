# tiny-server

非常精简的 nodejs server 框架

## 安装

需要环境： nodejs 7.0 +

~~~shell
$ git clone https://github.com/yj1438/tiny-server.git
$ cd tiny-server
$ npm init
~~~

## 启动

~~~shell
$ gulp (有可能需要管理员权限)
~~~

## 示例

成功后，在浏览器里打开

> https://0.0.0.0/admin/index/index/aaa/bbb/ccc  
> https://0.0.0.0

就可以看到结果了

## GET STARTED

#### controller

在 `server/controllers` 文件夹下添加一个控制器文件 `index.js`: 

~~~javascript
import BaseController from '../lib/BaseController';
import IndexService from '../service/indexService';

class Index extends BaseController{

    constructor(req, res) {
        super(req, res);
        this.indexService = new IndexService();
    }

    index() {
        const data = {};
        data.message = '这是一条简单的消息';
        this.render('index/index', data);           // 指向 views/index/index 模板
    };

}

export default Index;
~~~

#### view

view 采用的是性能优异的 [art-template](https://github.com/aui/artTemplate)，模板语法可以直接去官网查看。

#### route

在 `server/route` 文件夹中，按业务添加你的 url 路由配置文件：

~~~javascript
export default [
    {
        method: 'get',              // request method
        url: /^\/$/i,               // url 匹配的正则
        controller: 'index',        // 指向的 controller
        action: 'index',            // 对应的 action
    },
];
~~~

通过以上开发，我们就制作并发布了一个页面了。

## 配置

`server/config/config.js` 文件是服务器的一些全局配置：

~~~javascript
export default {
    certificate: {                                              // https 的签名文件
        key: fs.readFileSync('SSL/ca.key'),
        cert: fs.readFileSync('SSL/cert.crt'),
        // ca: fs.readFileSync('SSL/fullchain.pem'),
    },
    host: '0.0.0.0',                                            // 服务器地址 默认可以为 0.0.0.0
    port_normal : '8082',                                       // http 端口
    port_ssl : '443',                                           // https 端口
    staticFileDir : 'static',                                   // 静态文件目录
    gzip : true,                                                // 是否开启 GZIP
    cacheControl : 7 * 24 * 3600,                               // 浏览器缓存时间（秒）0为不开启
    routePrefix: '/prefix',                                     // 路由的默认前缀 
};
~~~

## controller

#### 获取 request 参数

在 controller 里，可以如下获取几种参数:

> get 参数: `this.params`：object
> post 参数: `this.post`：object
> file 上传文件: `this.files`：fileList

#### response 输出

默认提供以下几种输出：

> `this.render(templeteName: string, templeteData: object)` 渲染一个模板页面
> `this.renderJson(data: object)` 输出 json，如果此时的 request 里有 **callback** 参数，会输出 jsonp 格式
> `this._404` 输出 404 页面
> `this._500` 输出 500 页面

## route

~~~javascript
export default [
    {
        method: 'get',              // request method
        url: /^\/$/i,               // url 匹配的正则
        controller: 'index',        // 指向的 controller
        action: 'index',            // 对应的 action
    },
];
~~~

其中 url 的配置比较灵活，可以接受任何正确的正则表达式，并且可以接收 uri 式的参数。

比如：`/user/123/book/456` 其中 `123`、`456` 是作为参数传递，可以匹配以下正则：

> /^\/user\/(.+)\/book\/(.+)/i

正则中的被 `()` 捕获的文本，都会传入 `constroller`: 

~~~javascript
class User extends BaseController{

    book(uri_param) {
        console.log(uri_param);             // ['123', '456']
    };

}
~~~

## service + dao

service 层在框架上没有进行任何封装和约束，可以自由写业务逻辑。

内置一个基础 dao：`server/common/database.js`, 内置两个方法：`handle`、`handleSync`，可以进行数据库的操作，其中 handleSync 是同步版本，建议使用此方法

## 发布协议

此 server 框架可以支持 http、https（包括http1、spdy2/3/3.1、http2）几种协议发布：

用户可打开 `gulpfile.js` 文件: 

~~~javascript
/**
 * =============更改 server 协议，换此入口文件================
 */
command.push('spdy.js');
~~~

> `http.js`     : http 协议发布
> `http1.js`    : https(http1) 协议发布
> `http2.js`    : https(http1/spdy2/spdy3/spdy3.1/http2) 协议发布
> `spdy.js`     : https(http1/http2) 协议发布

如用 https 发布，http 直接重定向到 https。
