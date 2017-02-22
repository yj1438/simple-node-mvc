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
    //指南针
    {
        method: 'get',
        url: /^\/compass(\/index)*/i,
        controller: 'compass',
        action: 'index'
    },
    //一起干干干
    {
        method: 'get',
        url: /^\/shopping\/autoLogin/i,
        controller: 'shoppinglist',
        action: 'autoLogin'
    },
    {
        method: 'post',
        url: /^\/shopping\/autoLogin/i,
        controller: 'shoppinglist',
        action: 'autoLogin'
    },
    {
        method: 'get',
        url: /^\/shopping\/getGroupList/i,
        controller: 'shoppinglist',
        action: 'getGroupList'
    },
    {
        method: 'get',
        url: /^\/shopping\/createGroup/i,
        controller: 'shoppinglist',
        action: 'createGroup'
    },
    {
        method: 'get',
        url: /^\/shopping\/getGroupInfo/i,
        controller: 'shoppinglist',
        action: 'getGroupInfo'
    },
    {
        method: 'get',
        url: /^\/shopping\/addTodo/i,
        controller: 'shoppinglist',
        action: 'addTodo'
    },
    {
        method: 'get',
        url: /^\/shopping\/changeTodoState/i,
        controller: 'shoppinglist',
        action: 'changeTodoState'
    },
    {
        method: 'get',
        url: /^\/shopping\/modifyGroupName/i,
        controller: 'shoppinglist',
        action: 'modifyGroupName'
    },


];