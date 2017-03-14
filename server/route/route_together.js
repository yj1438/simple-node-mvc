export default [
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
    {
        method: 'get',
        url: /^\/shopping\/joinGroup/i,
        controller: 'shoppinglist',
        action: 'joinGroup'
    },
    {
        method: 'get',
        url: /^\/shopping\/deleteGroup/i,
        controller: 'shoppinglist',
        action: 'deleteGroup'
    },
    {
        method: 'get',
        url: /^\/shopping\/deleteTodo/i,
        controller: 'shoppinglist',
        action: 'deleteTodo'
    },
];