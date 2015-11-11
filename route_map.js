module.exports = [
    {
        method: 'get',
        url: /^\/$/i,
        controller: 'index',
        action: 'index'
    },
    {
        method: 'post',
        url: /^\/$/i,
        controller: 'index',
        action: 'index'
    },
    {
        method: 'get',
        url: /^\/index\/demo$/i,
        controller: 'index',
        action: 'demo'
    },
    {
        method: 'get',
        url: /^\/amp\/everything$/i,
        controller: 'amp',
        action: 'everything'
    },
    {
        method: 'get',
        url: /^\/amp\/ads/i,
        controller: 'amp',
        action: 'ads'
    },
    {
        method: 'get',
        url: /^\/amp\/article/i,
        controller: 'amp',
        action: 'article'
    },
    {
        method: 'get',
        url: /^\/amp\/instagram/i,
        controller: 'amp',
        action: 'instagram'
    },
    {
        method: 'get',
        url: /^\/amp\/pinterest/i,
        controller: 'amp',
        action: 'pinterest'
    },
    {
        method: 'get',
        url: /^\/amp\/released/i,
        controller: 'amp',
        action: 'released'
    },
    {
        method: 'get',
        url: /^\/amp\/twitter/i,
        controller: 'amp',
        action: 'twitter'
    },
    {
        method: 'get',
        url: /^\/amp\/viewer/i,
        controller: 'amp',
        action: 'viewer'
    }
];