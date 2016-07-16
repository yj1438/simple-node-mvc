/**
* 模板引擎
*/
'use strict';

const path = require('path'),
    template = require('art-template'),
    str2steam = require('string-to-stream'),
    responseUtil = require('./responseUtil');

const basePath = process.cwd(),
    httpError = require('./httpError');

module.exports = {
    output: responseUtil.out,
    
    render: function (viewName, data) {
        let viewfile = path.join(basePath, 'views', viewName),
            output,
            strStream;
        try {
            output = template(viewfile, data);
            strStream = str2steam(output);
            this.output(strStream, 'html', {});
        } catch (err) {
            httpError.handler500(this.req, this.res, err.toString());
            return;
        }
    },
    renderJson: function (data) {
        const callbackFnName = this.params.callback;
        let strStream;
        if (callbackFnName) {
            strStream = str2steam(callbackFnName + '(' + JSON.stringify(data) + ')');
        } else {
            strStream = str2steam(JSON.stringify(data));
        }
        this.output(strStream, 'json', {});
        
    }
};