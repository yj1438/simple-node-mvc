/*
* 项目配置文件
*/
'use strict';

import fs from 'fs';

export default {
    
    certificate: {
        key: fs.readFileSync('SSL/3_www.h2statistics.ml.key'),
        cert: fs.readFileSync('SSL/2_www.h2statistics.ml.crt'),
        ca: fs.readFileSync('SSL/1_root_bundle.crt'),
    },
    
    host: '0.0.0.0',
    
    port_normal : '8082',

    port_ssl : '443',
    
    staticFileDir : 'static',               //静态文件文件夹，相对根目录
                
    gzip : true,                            //是否开启 GZIP
    
    /*
     * 浏览器缓存时间
     * 0: 没有缓存
     */
    cacheControl : 7 * 24 * 3600,            //浏览器缓存时间（秒）
    
};
