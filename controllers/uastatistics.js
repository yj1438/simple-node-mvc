'use strict';
const http2Service = require('../service/http2Service');

exports.sortId = function () {
};

//统计 UA 列表页
exports.index = function () {
    this.render('ua/index', {});
};

//"pageSize":20,"startRecord":0,"nowPage":1, exhibitDatas, recordCount, pageCount, isSuccess
exports.getdata = function () {
    let _params = JSON.parse(this.params.dtGridPager);
    let page = {
        nowPage: _params.nowPage,
        pageSize: _params.pageSize
    };
    http2Service.findPage(page, (err, rows) => {
        if (err) {
            console.log(err);
            this.renderJson(Object.assign({}, _params, {isSuccess: false}));
        } else {
            let resultList = rows[0],
                total = parseInt(rows[1][0].total, 10);
            resultList.map((value, index) => {
                value.is_spdy = value.is_spdy ? 'yes' : 'no';
                return value;
            });
            let pageCount = Math.ceil(total / page.pageSize);
            this.renderJson(Object.assign({}, _params, {isSuccess: true, exhibitDatas: rows[0], recordCount: total, pageCount: pageCount}));
        }
    });
}

//取列表 JSON 数据
exports.getalldata = function () {
    http2Service.findAll((err, rows) => {
        if (err) {
            console.log(err);
            this.renderJson([]);
        } else {
            rows.map((value, index) => {
                value.is_spdy = value.is_spdy ? 'yes' : 'no'
                return value;
            });
            this.renderJson(rows);
        }
    });
};

//统计 UA 图表页
exports.charts = function () {
    
    http2Service.countProtocal((err, rows) => {
        if (err) {
            console.log(err);
            this.render('ua/charts', {data: null, total: 0});
        } else {
            //计算全部
            let total = 0,
                resultData = [];
            for(let value of rows) {
                total = total + parseInt(value.num, 10);
                resultData.push({
                    name: value.protocol,
                    num: value.num
                });
            }
            resultData.map((value, index) => {
                value.y = (value.num / total).toFixed(4) * 100;
                return value;
            })
            this.render('ua/charts', {data: JSON.stringify(resultData), total: total});
        }
    });
    
};