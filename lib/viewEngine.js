/**
* 模板引擎
*
*/
var path = require('path'),
    template = require('art-template');

var httpError = require('./httpError');

module.exports = {
    render: function (req, res, viewName, data) {
        var filename = viewName,
            output;
        try {
            //var output = Shotenjin.renderView(filename, data);
            output = template(filename, data);
        } catch (err) {
            httpError.handler500(req, res, err);
            return;
        }
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.end(output);
    },
    renderJson: function (req, res, data) {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(data));
    }
};