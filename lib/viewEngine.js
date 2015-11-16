/**
* 模板引擎
*
*/
var path = require('path'),
    template = require('art-template'),
    str2steam = require('string-to-stream'),
    responseUtil = require('./responseUtil');

var httpError = require('./httpError');

module.exports = {
    render: function (req, res, viewName, data) {
        var filename = viewName,
            output,
            strStream;
        try {
            output = template(filename, data);
            strStream = str2steam(output);
            responseUtil.out(req, res, strStream, 'html', {});
        } catch (err) {
            httpError.handler500(req, res, err);
            return;
        }
//        res.writeHead(200, {
//            'Content-Type': 'text/html'
//        });
//        res.end(output);
    },
    renderJson: function (req, res, data) {
        var strStream = str2steam(JSON.stringify(data));
        responseUtil.out(req, res, strStream, 'json', {});
//        res.writeHead(200, {
//            'Content-Type': 'application/json'
//        });
//        res.end(JSON.stringify(data));
    }
};