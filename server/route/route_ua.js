export default [
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
];