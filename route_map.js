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
    }
    
];