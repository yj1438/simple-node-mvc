module.exports = [
    {
        method: 'get',
        url: /^\/$/i,
        controller: 'index',
        action: 'index'
    },
    {
        method: 'get',
        url: /^\/http2\/index$/i,
        controller: 'http2',
        action: 'index'
    },
    {
        method: 'get',
        url: /^\/http2\/demo$/i,
        controller: 'http2',
        action: 'demo'
    },
    {
        method: 'post',
        url: /^\/ua\/getdata/i,
        controller: 'uastatistics',
        action: 'getdata'
    },
    {
        method: 'get',
        url: /^\/ua\/getdata/i,
        controller: 'uastatistics',
        action: 'getdata'
    },
    {
        method: 'get',
        url: /^\/ua\/index/i,
        controller: 'uastatistics',
        action: 'index'
    },
    {
        method: 'get',
        url: /^\/ua\/charts/i,
        controller: 'uastatistics',
        action: 'charts'
    },
    {
        method: 'get',
        url: /^\/ua\/sortid/i,
        controller: 'uastatistics',
        action: 'sortId'
    },
    //iscroll
    {
        method: 'get',
        url: /^\/iscroll\/index/i,
        controller: 'iscroll',
        action: 'index'
    },
    //wechart
    {
        method: 'get',
        url: /^\/wechat\/get_js_api_sign/i,
        controller: 'wechat',
        action: 'get_js_api_sign'
    },
    //JWPLAYER
    {
        method: 'get',
        url: /^\/jwplayer\/index/i,
        controller: 'jwplayer',
        action: 'index'
    }

];