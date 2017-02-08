import request from 'request';

import BaseController from '../lib/BaseController';

class ShoppingList extends BaseController {
    constructor(req, res) {
        super(req, res);
    }

    autoLogin () {
        const params = this.post;
        // const post = this.post;
        console.log(params);
        const code = params.code;
        // const encryptedData = params.encryptedData;
        // const iv = params.iv;

        const loginUrl = 'https://api.weixin.qq.com/sns/jscode2session?appid=wxca06347ac1f9b163&secret=2ba4bcbeb7439980a46fbb7323dd99db&js_code=' + code + '&grant_type=authorization_code'
        request(loginUrl,
            (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    const result = JSON.parse(body);
                    this.renderJson({
                        status: 'success',
                        data: {
                            openid: result.openid,
                        },
                    });
                } else {
                    this.renderJson({
                        status: 'fail',
                    });
                }
            }
        );
    }

    initGroup () {
        this.renderJson({
            status: 'success',
        });
    }

    createGroup () {

    }

}

export default ShoppingList;