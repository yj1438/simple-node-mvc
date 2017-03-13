'use strict';

const request = require('request');

const DataCache = require('./DataCache');

const APP_KEY = require('./AppKey'); 

const TOKEN_URL = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + APP_KEY.APP_ID + '&secret=' + APP_KEY.APP_SECRET;

function getToken(callback) {
    const nowTs = Math.floor(new Date().getTime() / 1000);
    if (nowTs > DataCache.token_expries) {
        console.log(TOKEN_URL);
        request(TOKEN_URL, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                const data = JSON.parse(body);
                (typeof callback === 'function') && callback(data.access_token);
                console.log(new Date() + '：获取新的token');
                console.log(data);
                DataCache.setToken(data);
            } else {
                callback(null);
            }
        });
    } else {
        (typeof callback === 'function') && callback(DataCache.token);
    }
}

module.exports = getToken;