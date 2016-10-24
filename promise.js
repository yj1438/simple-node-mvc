'use strict';

const request = require('request');

const promise1 = new Promise((resolve, reject) => {
    request('https://www.baidu.coaaam', (err, response, body) => {
        if (err) {
            reject(err);
            return;
        }
        resolve(body);
    });
});

promise1.then((body) => {
    console.log(body);
}).catch((err) => {
    console.log(err);
})