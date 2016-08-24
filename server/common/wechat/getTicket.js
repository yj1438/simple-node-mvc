'use strict';

const request = require('request');

const getToken = require('./getToken');

let DataCache = require('./DataCache');

let TICKET_URL = 'http://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi&access_token=';

function getTicket(callback) {
    const nowTs = Math.floor(new Date().getTime() / 1000);
    if (nowTs > DataCache.ticket_expries) {
        getToken(function (token) {
            if (!token) {
                (typeof callback === 'function') && callback(null);
            } else {
                TICKET_URL = TICKET_URL + token;
                request(TICKET_URL, function (error, response, body) {
                    if (!error && response.statusCode === 200) {
                        const data = JSON.parse(body);
                        (typeof callback === 'function') && callback(data.ticket);
                        console.log(new Date() + '：获取新的ticket');
                        console.log(data);
                        DataCache.setTicket(data);
                    } else {
                        (typeof callback === 'function') && callback(null);
                    }
                });
            }
        })
    } else {
        (typeof callback === 'function') && callback(DataCache.ticket);
    }
}

module.exports = getTicket;