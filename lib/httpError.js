/*
* 错误处理
*/
'use strict';
exports.handler404 = function (req, res) {
    'use strict';
    res.writeHead(404, {
        'Content-Type': 'text/plain'
    });
    res.end('Not Found');
};
exports.handler500 = function (req, res, err) {
    'use strict';
    res.writeHead(500, {
        'Content-Type': 'text/plain'
    });
    res.end(err);
};