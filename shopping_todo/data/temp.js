const fs = require('fs');

const user = ["张伟","王伟","王芳","李伟","王秀英","李秀英","李娜","张秀英",
"刘伟","张敏","李静","张丽","王静","王丽","李强","张静","李敏","王敏","王磊","李军",
"刘洋","王勇","张勇","王艳","李杰","张磊","王强","王军","张杰","李娟","张艳","张涛",
"王涛","李明","李艳","王超","李勇","王娟","刘杰","王秀兰","李霞",
"刘敏","张军","李丽","张强","王平","王刚","王杰","李桂英","刘芳"];

const need = [
    '婴儿车800-900元的', '尿布一大箱，200个', '吸奶器二个，手动的', '奶嘴5个，日本产的', '连体裤两条，不用太厚', '小毯子两个，一厚一薄', 
    '小孩包裹，大一点的', '0-1岁奶粉6筒', '婴儿床，可以推动的', '弯头吸管一包', '洗洁精两个', 
    '全棉哺乳文胸三条', '全棉内裤三条', '袜子三双', '女性专用湿巾', '宝宝湿巾，一定别带酒精的', '医用棉球一包', '薄抱被一条',
    '口水巾两个，纯棉的', '胎帽一个，稍厚一点', '脚套，稍厚一点', '手套，稍厚一点', '奶瓶消毒锅', '浴盆一个，够两岁小孩用的'
];


function getRandomUser() {
    const len = user.length;
    const index = Math.floor(len * Math.random());
    return {
        name: user[index],
        uid: 'user_' + index,
        avatar: 'avatar_' + Math.ceil(20 * Math.random()) + '.png',
    };
}

function getRandomNeed() {
    const len = need.length;
    const index = Math.floor(len * Math.random());
    return need[index];
}

function getRandomTs() {
    let date = '2017-01-';
    let day = 1 + (Math.floor(31 * Math.random()));
    day = day < 10 ? ('0' + day) : day;
    return date + day;
}

function getMembers(group) {
    const members = [];
    group.forEach((item) => {
        if (members.indexOf(item.user) === -1) {
            members.push(item.user);
        }
        if (members.indexOf(item.by) === -1) {
            members.push(item.by);
        }
    });
    return members;
}

let i = 8;
const groupList = [];
while (i > 0) {
    const group = {list: [], members: []};
    const arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
    let j = 10;
    while (j > 0) {
        const id = j;
        const data = {
            id: id,
            user: getRandomUser(),
            need: getRandomNeed(),
            isDone: Math.floor(Math.random() / 0.33333333),
            by: getRandomUser(),
            date: getRandomTs(),
        };
        group.list.push(data);
        --j;
    }
    group.members = getMembers(group.list);
    groupList.push(group);
    --i;
}
// console.log(JSON.stringify(groupList));

fs.writeFileSync('groupData.js', JSON.stringify(groupList), 'utf8');