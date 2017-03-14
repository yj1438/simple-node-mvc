/*
* 错误处理
*/
'use strict';

class HttpError {

    static handler404(req, res) {
        res.writeHead(404, {
            'Content-Type': 'text/plain'
        });
        res.end('Not Found');
    }

    static handler500(req, res, err = '') {
        res.writeHead(500, {
            'Content-Type': 'text/plain'
        });
        res.end(err);
    };
}

export default HttpError;
