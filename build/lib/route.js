/**
 * @author qleelulu
 * @blog http://qleelulu.cnblogs.com
 */
'use strict';

var url_parse = require('url').parse,
    route_map = require('../route_map');

//根据http请求的method来分别保存route规则
var routes = {
    get: [],
    post: [],
    head: [],
    put: [],
    delete: []
};

/**
 * 注册route规则
 * 示例：
 * route.map({
 *     method:'post',
 *     url: /\/blog\/post\/(\d+)\/?$/i,
 *     controller: 'blog',
 *     action: 'showBlogPost'
 * })
 */
function constructMap(map) {
    var routeItem = void 0;
    for (var i = 0; i < map.length; i = i + 1) {
        routeItem = map[i];
        if (routeItem && routeItem.url && routeItem.controller) {
            var method = routeItem.method ? routeItem.method.toLowerCase() : 'get';
            routes[method].push({
                url: routeItem.url, //url匹配正则
                controller: routeItem.controller,
                action: routeItem.action || 'index'
            });
        }
    }
}
//加载路由
constructMap(route_map);

exports.getActionInfo = function (url, method) {
    // url: /blog/index?page=1 ,则pathname为: /blog/index
    method = method ? method.toLowerCase() : 'get';
    var pathname = url_parse(url).pathname,
        m_routes = routes[method];
    var route = {
        controller: null,
        action: null,
        args: null
    };
    for (var k in m_routes) {
        if (m_routes.hasOwnProperty(k)) {
            //正则匹配
            route.args = m_routes[k].url.exec(pathname);
            if (route.args) {
                route.controller = m_routes[k].controller;
                route.action = m_routes[k].action;
                route.args.shift(); //第一个值为匹配到的整个url，去掉
                break;
            }
        }
    }
    //如果匹配到route，r大概是 {controller:'blog', action:'index', args:['1']}
    return route;
};
//# sourceMappingURL=route.js.map
