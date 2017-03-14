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

## 开发

### 基础开发

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
        this.render('index/index', data);
    };

}

export default Index;
~~~

#### view


特点：

* 采用传统的 web 后台 mvc 框架模式，包括路由、控制器、模板、业务层、数据库操作类等基础内容
* 支持 http、https 两种发布协议，以 https 发布后，http 直接重定向到 https
* 支持 http1、spdy2/3/3.1、http2 协议
* 内置数据库操作类及相关配置，引入后可以直接读写数据库
* 支持静态资源文件直接发布，支持 gzip、deflate 压缩，缓存时间可配
* 代码书写采用 es6 语法，gulp4 进行 babel 的实时编译更新服务，一键启动
* server 文件夹为开发源码，build 为编译后的文件
* 模板引擎采用 [art-template](https://github.com/aui/artTemplate)，性能优异，用户可自由替换
