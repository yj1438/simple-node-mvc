export default [
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
];