
'use strict';

import fs from 'fs';
import path from 'path';
import { parse, } from 'url';
// import route_map from '../route_map';
import config from '../config/config';


const root = process.cwd();
const routeDir = path.resolve(root, 'route');

class Route {

    /**
     * 根据http请求的method来分别保存route规则
     * @memberOf Route
     */
    routes = {
        get: [],
        post: [],
        head: [],
        put: [],
        delete: [],
    }; 

    constructor () {
        let fileArr = fs.readdirSync(routeDir);
        const routeMap = [];
        fileArr = fileArr
            .filter((fileName) => {
                const fileState = fs.lstatSync(path.resolve(routeDir, fileName));
                return !fileState.isDirectory();
            });
        for (let i = 0; i < fileArr.length; i++) {
            const file = fileArr[i];
            const map = require(path.resolve('./route', file)).default;
            Array.prototype.push.apply(routeMap, map);
        }

        if (Object.prototype.toString.call(routeMap) !== '[object Array]') {
            return;
        }
        for (const routeItem of routeMap) {
            if (routeItem && routeItem.url && routeItem.controller) {
                const method = routeItem.method ? routeItem.method.toLowerCase() : 'get';
                this.routes[method].push({
                    url: routeItem.url, //url匹配正则
                    controller: routeItem.controller,
                    action: routeItem.action || 'index',            //默认index
                });
            }
        }
    }

    /**
     * 获取路由信息方法
     * @param {any} url 
     * @param {any} method 
     * @returns 
     * @memberOf Route
     */
    getActionInfo(url, method) {
        // url: /blog/index?page=1 ,则pathname为: /blog/index
        method = method ? method.toLowerCase() : 'get';
        let pathname = parse(url).pathname,
            m_routes = this.routes[method];
        if (pathname.indexOf(config.routePrefix) === 0) {
            pathname = pathname.replace(config.routePrefix, '');
        }
        const route = {
            controller: null,
            action: null,
            args: null,
        };
        for (const _route of m_routes) {
            //正则匹配
            route.args = _route.url.exec(pathname);
            if (route.args) {
                route.controller = _route.controller;
                route.action = _route.action;
                /**
                 * 处理 uri 参数
                 */
                route.args.shift(); //第一个值为匹配到的整个url，去掉
                delete route.args['index'];
                delete route.args['input'];
                break;
            }            
        }
        // 放松 controller 和 action 的配置校验
        // if ()
        //如果匹配到route，r大概是 {controller:'blog', action:'index', args:['1']}
        return route;
    }
}

export default new Route();
