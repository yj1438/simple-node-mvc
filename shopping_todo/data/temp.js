const user = ["张伟","王伟","王芳","李伟","王秀英","李秀英","李娜","张秀英",
"刘伟","张敏","李静","张丽","王静","王丽","李强","张静","李敏","王敏","王磊","李军",
"刘洋","王勇","张勇","王艳","李杰","张磊","王强","王军","张杰","李娟","张艳","张涛",
"王涛","李明","李艳","王超","李勇","王娟","刘杰","王秀兰","李霞",
"刘敏","张军","李丽","张强","王平","王刚","王杰","李桂英","刘芳"];

const need = [
    '婴儿车', '尿布', '吸奶器', '奶嘴5个', '连体裤', '小毯子', 
    '包裹', '0-1岁奶粉', '婴儿床', '弯头吸管一包', '洗洁精', 
    '全棉哺乳文胸', '全棉内裤', '袜子三双', '女性专用湿巾', '宝宝湿巾', '医用棉球一包', '薄抱被一条',
    '口水巾', '胎帽', '脚套', '手套', '奶瓶消毒锅', '浴盆'
];

function getRandomUser() {
    const len = user.length;
    const index = Math.floor(len * Math.random());
    return user[index];
}

function getRandomNeed() {
    const len = need.length;
    const index = Math.floor(len * Math.random());
    return need[index];
}

function getMembers(group) {
    const members = [];
    group.forEach((item) => {
        if (members.indexOf(item.name) === -1) {
            members.push(item.name);
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
    let j = 10;
    while (j > 0) {
        const data = {
            name: getRandomUser(),
            need: getRandomNeed(),
            isDone: (Math.random() >= 0.5) ? true : false,
            by: getRandomUser()
        };
        group.list.push(data);
        --j;
    }
    group.members = getMembers(group.list);
    groupList.push(group);
    --i;
}
console.log(groupList);
console.log(JSON.stringify(groupList));