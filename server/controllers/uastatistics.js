'use strict';

import BaseController from '../lib/BaseController';

import Http2Service from '../service/http2Service';
import RefService from '../service/refService';


// exports.sortId = function () {
// };

class Uastatistics extends BaseController {

    constructor(req, res) {
        super(req, res);
        this.http2Service = new Http2Service();
        this.refService = new RefService();
    }

    /**
     * 统计首页
     */
    index() {
        this.render('ua/index', {})
    }


    getdata() {
        let _params = JSON.parse(this.post.dtGridPager);
        let page = {
            nowPage: _params.nowPage,
            pageSize: _params.pageSize
        };
        this.http2Service.findPage(page, (err, rows) => {
            if (err) {
                console.log(err);
                this.renderJson(Object.assign({}, _params, {isSuccess: false}));
            } else {
                let resultList = rows[0],
                    total = parseInt(rows[1][0].total, 10);
                resultList.map((value) => {
                    value.is_spdy = value.is_spdy ? 'yes' : 'no';
                    return value;
                });
                let pageCount = Math.ceil(total / page.pageSize);
                this.renderJson(Object.assign({}, _params, {isSuccess: true, exhibitDatas: rows[0], recordCount: total, pageCount: pageCount}));
            }
        });
    }

    //取列表 JSON 数据
    getalldata() {
        this.http2Service.findAll((err, rows) => {
            if (err) {
                console.log(err);
                this.renderJson([]);
            } else {
                rows.map((value) => {
                    value.is_spdy = value.is_spdy ? 'yes' : 'no'
                    return value;
                });
                this.renderJson(rows);
            }
        });
    };


    //统计 UA 图表页
    charts() {
        const ref = this.params.ref ? decodeURIComponent(this.params.ref) : null;
        //如果没有 ref 则统计全部
        let total = 0,
            resultData = [];
        if (!ref) {
            this.http2Service.countProtocal((err, rows) => {
                if (err) {
                    console.error(err);
                    this.render('ua/charts', {data: null, total: 0});
                } else {
                    //计算全部
                    for(let value of rows) {
                        total = total + parseInt(value.num, 10);
                        resultData.push({
                            name: value.protocol,
                            num: value.num
                        });
                    }
                    resultData.map((value) => {
                        value.y = (value.num / total).toFixed(4) * 100;
                        return value;
                    });
                    this.render('ua/charts', {data: JSON.stringify(resultData), total: total});
                }
            });
        } else {
            this.refService.findByRef(ref, (err, rows) => {
                if (err) {
                    console.error(err);
                    this.render('ua/charts', {data: null, total: 0});
                } else {
                    if (rows.length === 0) {
                        this.render('ua/charts', {data: null, total: 0});
                    } else {
                        const _data = rows[0],
                            _protocol = ['http1', 'spdy2', 'spdy3', 'spdy3_1', 'http2'];
                        for (let p of _protocol) {
                            if (!_data[p])
                                continue;
                            total = total + _data[p];
                            resultData.push({
                                name: p,
                                num: _data[p]
                            });
                        }
                        resultData.map((value) => {
                            value.y = (value.num / total).toFixed(4) * 100;
                            return value;
                        });
                        this.render('ua/charts', {data: JSON.stringify(resultData), total: total, ref: ref});
                    }
                }
            });
        }
    };

}


export default Uastatistics;