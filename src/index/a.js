require('./../css/style.less');

var pEle = document.createElement('p');
pEle.textContent = 'haha, 你看到我了，我是 JS 添加的！';
document.getElementById('main_page').appendChild(pEle);