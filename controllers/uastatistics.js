'use strict';
const fs = require('fs');
const readline = require('readline');

exports.index = function () {
    this.render('ua/index', {});
};

exports.getdata = function () {
//    let params = JSON.parse(this.params['dtGridPager'] || '{}') || null;
    let uaListData = [];
    const rl = readline.createInterface({
        input: fs.createReadStream('data/ua_data.json')
    });

    rl.on('line', (line) => {
        uaListData.push(JSON.parse(line))
    }).on('close', () => {
        this.renderJson(uaListData);
//        {
//            isSuccess: true,
//            exhibitDatas: uaListData,
//            pageSize: params.pageSize,
//            nowPage: params.nowPage,
//            recordCount: uaListData.length,
//            pageCount: Math.ceil(uaListData.length / 20)
//        }
    });
    
};