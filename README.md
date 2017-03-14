# tiny-server

非常精简的 nodejs server 框架

特点：

* 采用传统的 web 后台 mvc 框架模式，包括路由、控制器、模板、业务层、数据库操作类等基础内容
* 支持 http、https 两种发布协议，以 https 发布后，http 直接重定向到 https
* 支持 http1、spdy2/3/3.1、http2 协议
* 内置数据库操作类及相关配置，引入后可以直接读写数据库
* 支持静态资源文件直接发布，支持 gzip、deflate 压缩，缓存时间可配
* 代码书写采用 es6 语法，gulp4 进行 babel 的实时编译更新服务，一键启动
* server 文件夹为开发源码，build 为编译后的文件
* 模板引擎采用 [art-template](https://github.com/aui/artTemplate)，性能优异，用户可自由替换

