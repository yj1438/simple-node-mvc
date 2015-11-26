/*
* 错误处理
*/
exports.handler404 = function (req, res) {
    'use strict';
    res.writeHead(404, {
        'Content-Type': 'text/plain'
    });
    res.end('Page Not Found');
};
exports.handler500 = function (req, res, err) {
    'use strict';
    res.writeHead(500, {
        'Content-Type': 'text/plain'
    });
    console.log(err);
    res.end(err);
};