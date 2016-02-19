/*
* 项目配置文件
*/

module.exports = {
    
    host: '101.200.191.40',
    
    port_normal : '80',

    port_ssl : '443',
    
    staticFileDir : 'static',               //静态文件文件夹
                
    gzip : true,                            //是否开启 GZIP
    
    cacheControl : 7 * 24 * 3600            //浏览器缓存时间（秒）
//    cacheControl : 0            //浏览器缓存时间（秒）
    
}
