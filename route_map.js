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
    }
];