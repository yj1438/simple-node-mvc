export default [
    //iscroll
    {
        method: 'get',
        url: /^\/iscroll\/index/i,
        controller: 'iscroll',
        action: 'index'
    },
    //指南针
    {
        method: 'get',
        url: /^\/compass(\/index)*/i,
        controller: 'compass',
        action: 'index'
    },
];