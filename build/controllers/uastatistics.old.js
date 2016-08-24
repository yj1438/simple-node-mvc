'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var readline = require('readline');

/**
 * 从数据文件中取数据
 */
function getUAList(callback) {
    var uaListData = [];

    if (typeof callback !== 'function') {
        return;
    }

    var rl = readline.createInterface({
        input: fs.createReadStream('data/ua_data.json')
    });
    rl.on('line', function (line) {
        uaListData.push(JSON.parse(line));
    }).on('close', function () {
        callback(uaListData);
    });
}

exports.sortId = function () {
    var self = this;
    getUAList(function (data) {
        var hashIds = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = (0, _getIterator3.default)(data), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var value = _step.value;

                hashIds.push(value.hashId);
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

        fs.writeFile('data/hash.json', hashIds.join("\n"), 'utf8', function (err) {
            if (err) {
                self.renderJson(err);
            } else {
                self.renderJson({ total: hashIds.length });
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
    var self = this;
    getUAList(function (data) {
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
    var self = this;
    getUAList(function (data) {
        var statistics = {},
            total = data.length,
            resultData = [];
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = (0, _getIterator3.default)(data), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var value = _step2.value;

                if (!statistics[value.protocol]) {
                    statistics[value.protocol] = 0;
                }
                statistics[value.protocol] = statistics[value.protocol] + 1;
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

        for (var key in statistics) {
            if (statistics.hasOwnProperty(key)) {
                resultData.push({
                    name: key,
                    num: statistics[key],
                    y: parseFloat((statistics[key] / total).toFixed(4)) * 100
                });
            }
        }
        self.render('ua/charts', { data: (0, _stringify2.default)(resultData), total: data.length });
        //        self.renderJson(statistics);
    });
};
//# sourceMappingURL=uastatistics.old.js.map
