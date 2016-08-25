/**
* 模板引擎
*/
'use strict';

import path from 'path';
import template from 'art-template';
import str2steam from 'string-to-stream';

import responseUtil from './responseUtil';
import { handler500 } from './httpError';

const basePath = process.cwd();

class ViewEngine {

    constructor(req, res) {
        this.output = responseUtil.out;
    }

    render(viewName, data) {
        let viewfile = path.join(basePath, 'server/views', viewName),
            output,
            strStream;
        try {
            output = template(viewfile, data);
            strStream = str2steam(output);
            this.output(strStream, 'html', {});
        } catch (err) {
            handler500(this.req, this.res, err.toString());
            return;
        }
    }

    renderJson(data) {
        const callbackFnName = this.params.callback;
        let strStream;
        if (callbackFnName) {
            strStream = str2steam(callbackFnName + '(' + JSON.stringify(data) + ')');
        } else {
            strStream = str2steam(JSON.stringify(data));
        }
        this.output(strStream, 'json', {});
    }
}

export default ViewEngine;

// export default {

//     output: responseUtil.out,
    
//     render: function (viewName, data) {
//         let viewfile = path.join(basePath, 'server/views', viewName),
//             output,
//             strStream;
//         try {
//             output = template(viewfile, data);
//             strStream = str2steam(output);
//             this.output(strStream, 'html', {});
//         } catch (err) {
//             handler500(this.req, this.res, err.toString());
//             return;
//         }
//     },
//     renderJson: function (data) {
//         const callbackFnName = this.params.callback;
//         let strStream;
//         if (callbackFnName) {
//             strStream = str2steam(callbackFnName + '(' + JSON.stringify(data) + ')');
//         } else {
//             strStream = str2steam(JSON.stringify(data));
//         }
//         this.output(strStream, 'json', {});
        
//     }
// };