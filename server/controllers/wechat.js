'use strict';

import BaseController from '../lib/BaseController';

import getTicket from './../common/wechat/getTicket';
import getSign from './../common/wechat/getSign';
import APP_KEY from './../common/wechat/AppKey';

/**
 * 获取微信 JS SDK 的 ticket
 */
class Wechat extends BaseController {

    constructor(req, res) {
        super(req, res);
    }
    
    get_js_api_sign() {
        //設定簽名URL來源
        const refer = this.req.headers['referer'] || 'http://yinjie.dev.babytree-inc.com/app/dayima/index/index';
        // 簽名
        let sign = null;
        console.log(refer);
        getTicket((ticket) => {
            if (ticket) {
                sign = getSign(ticket, refer);
                //delete sign.jsapi_ticket;     //這個字段不需要
                sign.appId = APP_KEY.APP_ID;
            }
            this.renderJson(sign);
        });
    }

}

export default Wechat;