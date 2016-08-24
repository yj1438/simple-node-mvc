'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var http2Service = require('../service/http2Service'),
    refService = require('../service/refService');

exports.sortId = function () {};

//统计 UA 列表页
exports.index = function () {
    this.render('ua/index', {});
};

//"pageSize":20,"startRecord":0,"nowPage":1, exhibitDatas, recordCount, pageCount, isSuccess
exports.getdata = function () {
    var _this = this;

    var _params = JSON.parse(this.params.dtGridPager);
    var page = {
        nowPage: _params.nowPage,
        pageSize: _params.pageSize
    };
    http2Service.findPage(page, function (err, rows) {
        if (err) {
            console.log(err);
            _this.renderJson((0, _assign2.default)({}, _params, { isSuccess: false }));
        } else {
            var resultList = rows[0],
                total = parseInt(rows[1][0].total, 10);
            resultList.map(function (value, index) {
                value.is_spdy = value.is_spdy ? 'yes' : 'no';
                return value;
            });
            var pageCount = Math.ceil(total / page.pageSize);
            _this.renderJson((0, _assign2.default)({}, _params, { isSuccess: true, exhibitDatas: rows[0], recordCount: total, pageCount: pageCount }));
        }
    });
};

//取列表 JSON 数据
exports.getalldata = function () {
    var _this2 = this;

    http2Service.findAll(function (err, rows) {
        if (err) {
            console.log(err);
            _this2.renderJson([]);
        } else {
            rows.map(function (value, index) {
                value.is_spdy = value.is_spdy ? 'yes' : 'no';
                return value;
            });
            _this2.renderJson(rows);
        }
    });
};

//统计 UA 图表页
exports.charts = function () {
    var _this3 = this;

    var ref = this.params.ref ? decodeURIComponent(this.params.ref) : null;
    //如果没有 ref 则统计全部
    var total = 0,
        resultData = [];
    if (!ref) {
        http2Service.countProtocal(function (err, rows) {
            if (err) {
                console.error(err);
                _this3.render('ua/charts', { data: null, total: 0 });
            } else {
                //计算全部
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = (0, _getIterator3.default)(rows), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var value = _step.value;

                        total = total + parseInt(value.num, 10);
                        resultData.push({
                            name: value.protocol,
                            num: value.num
                        });
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                resultData.map(function (value, index) {
                    value.y = (value.num / total).toFixed(4) * 100;
                    return value;
                });
                _this3.render('ua/charts', { data: (0, _stringify2.default)(resultData), total: total });
            }
        });
    } else {
        refService.findByRef(ref, function (err, rows) {
            if (err) {
                console.error(err);
                _this3.render('ua/charts', { data: null, total: 0 });
            } else {
                if (rows.length === 0) {
                    _this3.render('ua/charts', { data: null, total: 0 });
                } else {
                    var _data = rows[0],
                        _protocol = ['http1', 'spdy2', 'spdy3', 'spdy3_1', 'http2'];
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = (0, _getIterator3.default)(_protocol), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var p = _step2.value;

                            if (!_data[p]) continue;
                            total = total + _data[p];
                            resultData.push({
                                name: p,
                                num: _data[p]
                            });
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }

                    resultData.map(function (value, index) {
                        value.y = (value.num / total).toFixed(4) * 100;
                        return value;
                    });
                    _this3.render('ua/charts', { data: (0, _stringify2.default)(resultData), total: total, ref: ref });
                }
            }
        });
    }
};
//# sourceMappingURL=uastatistics.js.map
