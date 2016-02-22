'use strict';
const fs = require('fs');
const readline = require('readline');

/**
 * 从数据文件中取数据
 */
function getUAList (callback) {
    let uaListData = [];
    
    if (typeof callback !== 'function') {
        return;
    }
    
    const rl = readline.createInterface({
        input: fs.createReadStream('data/ua_data.json')
    });
    rl.on('line', (line) => {
        uaListData.push(JSON.parse(line));
    }).on('close', () => {
        callback(uaListData);
    });
}

exports.sortId = function () {
    let self = this;
    getUAList(function (data) {
        let hashIds = [];
        for (let value of data) {
            hashIds.push(value.hashId);
        }
        fs.writeFile('data/hash.json', hashIds.join("\n"), 'utf8', (err) => {
            if (err) {
                self.renderJson(err);
            } else {
                self.renderJson({total: hashIds.length});
            }
        });
    });
};

//统计 UA 列表页
exports.index = function () {
    this.render('ua/index', {});
};

//取列表 JSON 数据
exports.getdata = function () {
    let self = this;
    getUAList (function (data) {
        self.renderJson(data);
        /*
        {
            isSuccess: true,
            exhibitDatas: uaListData,
            pageSize: params.pageSize,
            nowPage: params.nowPage,
            recordCount: uaListData.length,
            pageCount: Math.ceil(uaListData.length / 20)
        }
        */
    });
};

//统计 UA 图表页
exports.charts = function () {
    let self = this;
    getUAList (function (data) {
        let statistics = {},
            total = data.length,
            resultData = [];
        for (let value of data) {
            if (!statistics[value.protocol]) {
                statistics[value.protocol] = 0;
            }
            statistics[value.protocol] = statistics[value.protocol] + 1;
        }
        for (let key in statistics) {
            if (statistics.hasOwnProperty(key)) {
                resultData.push({
                    name: key,
                    num: statistics[key],
                    y: parseFloat((statistics[key] / total).toFixed(4)) * 100
                });
            }
        }
        self.render('ua/charts', {data: JSON.stringify(resultData), total: data.length});
//        self.renderJson(statistics);
    });
};