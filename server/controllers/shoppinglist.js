import request from 'request';

import BaseController from '../lib/BaseController';
import ShoppingListService from '../service/shoppingListService';
import ShoppingListStorage from '../service/shoppingListStorage';

import WXconfig from '../common/wechat/AppKey';
import WXBizDataCrypt from '../lib/wx_aes/WXBizDataCrypt';

class ShoppingList extends BaseController {
    constructor(req, res) {
        super(req, res);
        this.shoppingListService = new ShoppingListService();
    }

    autoLogin () {
        const params = this.post;

        const code = params.code;
        const encryptedData = params.encryptedData;
        const iv = params.iv;

        const loginUrl = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + WXconfig.WX_MINI_ID + '&secret=' + WXconfig.WX_MINI_SECRET + '&js_code=' + code + '&grant_type=authorization_code'
        
        request(loginUrl,
            async (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    const result = JSON.parse(body);
                    const openid = result.openid;
                    const session_key = result.session_key;
                    let member = await this.shoppingListService.getMemberByOpenid(openid);

                    console.log(member);

                    const pc = new WXBizDataCrypt(WXconfig.WX_MINI_ID, session_key)
                    const decryptData = pc.decryptData(encryptedData , iv);

                    if (member && member.length > 0) {
                        member = member[0];
                        member.openId = member.openid;
                        this.renderJson({
                            status: 'success',
                            data: member
                        });
                        ShoppingListStorage.setMember(openid, member);
                    } else {
                        let result = await this.shoppingListService.registerMember(decryptData);
                        console.log(result);
                        this.renderJson({
                            status: 'success',
                            data: decryptData
                        });
                        ShoppingListStorage.setMember(openid, decryptData);
                    }

                } else {
                    this.renderJson({
                        status: 'fail',
                    });
                }
            });
    }

    async initGroup () {
        const openId = this.params.login_string;
        try {
            let groups = await this.shoppingListService.getGroupByMember(openId);
            console.log(groups);
            if (groups.length === 0) {
                console.log(ShoppingListStorage);
                const memberInfo = ShoppingListStorage.getMemmber(openId);
                const result = await this.shoppingListService.createGroup(memberInfo, {});
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
        this.renderJson({
            status: 'success',
        });
    }

    createGroup () {

    }

}

export default ShoppingList;