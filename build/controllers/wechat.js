'use strict';

var getTicket = require('./../common/wechat/getTicket'),
    getSign = require('./../common/wechat/getSign'),
    APP_KEY = require('./../common/wechat/AppKey');

/**
 * 获取微信 JS SDK 的 ticket
 */
exports.get_js_api_sign = function () {
    var _this = this;

    var _req = this.req,
        refer = this.req.headers['referer'] || 'http://yinjie.dev.babytree-inc.com/app/dayima/index/index';

    var sign = null;

    console.log(refer);

    getTicket(function (ticket) {
        if (ticket) {
            sign = getSign(ticket, refer);
            //delete sign.jsapi_ticket;
            sign.appId = APP_KEY.APP_ID;
        }
        _this.renderJson(sign);
    });
};
//# sourceMappingURL=wechat.js.map
