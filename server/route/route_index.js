export default [
    {
        method: 'get',
        url: /^\/$/i,
        controller: 'index',
        action: 'index',
    },
    /**
     * 带参数的路由
     */
    {
        method: 'get',
        url: /^\/index\/index\/(.+)\/bbb\/(.+)/i,
        controller: 'index',
        action: 'index',
    },
];