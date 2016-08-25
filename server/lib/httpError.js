/*
* 错误处理
*/
'use strict';

export function handler404 (req, res) {
    res.writeHead(404, {
        'Content-Type': 'text/plain'
    });
    res.end('Not Found');
};
export function handler500 (req, res, err) {
    res.writeHead(500, {
        'Content-Type': 'text/plain'
    });
    res.end(err);
};