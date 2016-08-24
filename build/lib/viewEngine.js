/**
* 模板引擎
*/
'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require('path'),
    template = require('art-template'),
    str2steam = require('string-to-stream'),
    responseUtil = require('./responseUtil');

var basePath = process.cwd(),
    httpError = require('./httpError');

module.exports = {
    output: responseUtil.out,

    render: function render(viewName, data) {
        var viewfile = path.join(basePath, 'server/views', viewName),
            output = void 0,
            strStream = void 0;
        try {
            output = template(viewfile, data);
            strStream = str2steam(output);
            this.output(strStream, 'html', {});
        } catch (err) {
            httpError.handler500(this.req, this.res, err.toString());
            return;
        }
    },
    renderJson: function renderJson(data) {
        var callbackFnName = this.params.callback;
        var strStream = void 0;
        if (callbackFnName) {
            strStream = str2steam(callbackFnName + '(' + (0, _stringify2.default)(data) + ')');
        } else {
            strStream = str2steam((0, _stringify2.default)(data));
        }
        this.output(strStream, 'json', {});
    }
};
//# sourceMappingURL=viewEngine.js.map
