
'use strict';

import { parse } from 'url';
import route_map from '../route_map';

//根据http请求的method来分别保存route规则
let routes = {
    get: [],
    post: [],
    head: [],
    put: [],
    delete: []
};

function _constructMap(map) {
    if (Object.prototype.toString.call(map) !== '[object Array]') {
        return;
    }
    for (const routeItem of map) {
        if (routeItem && routeItem.url && routeItem.controller) {
            const method = routeItem.method ? routeItem.method.toLowerCase() : 'get';
            routes[method].push({
                url: routeItem.url, //url匹配正则
                controller: routeItem.controller,
                action: routeItem.action || 'index'             //默认index
            });
        }
    }
}

_constructMap(route_map);

class Route {

    static getActionInfo(url, method) {
        // url: /blog/index?page=1 ,则pathname为: /blog/index
        method = method ? method.toLowerCase() : 'get';
        const pathname = parse(url).pathname,
            m_routes = routes[method];
        let route = {
            controller: null,
            action: null,
            args: null
        };
        for (const _route of m_routes) {
            //正则匹配
            route.args = _route.url.exec(pathname);
            if (route.args) {
                route.controller = _route.controller;
                route.action = _route.action;
                route.args.shift(); //第一个值为匹配到的整个url，去掉
                break;
            }            
        }
        //如果匹配到route，r大概是 {controller:'blog', action:'index', args:['1']}
        return route;
    }
}

export default Route;
