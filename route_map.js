module.exports = [
    {
        method: 'get',
        url: /^\/$/i,
        controller: 'demo',
        action: 'index'
    },
    {
        method: 'post',
        url: /^\/$/i,
        controller: 'demo',
        action: 'index'
    },
    {
        method: 'get',
        url: /^\/demo\/index$/i,
        controller: 'demo',
        action: 'index'
    },
    {
        method: 'get',
        url: /^\/index\/index$/i,
        controller: 'index',
        action: 'index'
    },
    {
        method: 'get',
        url: /^\/index\/demo$/i,
        controller: 'index',
        action: 'demo'
    }
];