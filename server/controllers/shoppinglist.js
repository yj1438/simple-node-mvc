import request from 'request';

import BaseController from '../lib/BaseController';
import WXBizDataCrypt from '../lib/wx_aes/WXBizDataCrypt';
import WXconfig from '../common/wechat/AppKey';
import ShoppingListService from '../service/shoppingListService';
// import ShoppingListStorage from '../service/shoppingListStorage';


class ShoppingList extends BaseController {

    constructor(req, res) {
        super(req, res);
        this.shoppingListService = new ShoppingListService();
    }

    /**
     * 用户自动登录
     * @memberOf ShoppingList
     */
    autoLogin () {
        const params = this.post;
        const code = params.code;
        const encryptedData = params.encryptedData;
        const iv = params.iv;

        const loginUrl = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + WXconfig.WX_MINI_ID 
            + '&secret=' + WXconfig.WX_MINI_SECRET 
            + '&js_code=' + code 
            + '&grant_type=authorization_code';
        
        request(loginUrl,
            async (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    const result = JSON.parse(body);
                    const openid = result.openid;
                    const session_key = result.session_key;
                    const pc = new WXBizDataCrypt(WXconfig.WX_MINI_ID, session_key)
                    const decryptData = pc.decryptData(encryptedData , iv);
                    
                    let member = await this.shoppingListService.getMemberByOpenid(openid);
                    delete decryptData.watermark;
                    if (member) {
                        decryptData.uid = member.id;
                        this.renderJson({
                            status: 'success',
                            data: decryptData,
                        });
                        // ShoppingListStorage.setMember(openid, member);
                    } else {
                        let result = await this.shoppingListService.registerMember(decryptData);
                        decryptData.uid = result.insertId;
                        this.renderJson({
                            status: 'success',
                            data: decryptData,
                        });
                        // ShoppingListStorage.setMember(openid, decryptData);
                    }

                } else {
                    this.renderJson({
                        status: 'fail',
                    });
                }
            });
    }

    /**
     * 获取某用户的的群组列表
     * @memberOf ShoppingList
     */
    async getGroupList () {
        const uid = this.params.login_string;
        try {
            const groups = await this.shoppingListService.getGroupByMember(uid);
            this.renderJson({
                status: 'success',
                data: groups,
            });
        } catch (err) {
            this.renderJson({
                status: 'fail',
                message: err,
            });
        }
    }

    /**
     * 为某用户创建一个群组
     * @memberOf ShoppingList
     */
    async createGroup () {
        const uid = this.params.login_string;
        try {
            const member = await this.shoppingListService.getMemberByUid(uid);
            const result = await this.shoppingListService.createGroup(member, {});
            if (result.group_id && result.group_member_id) {
                this.renderJson({
                    status: 'success',
                    data: result,
                });
            } else {
                this.renderJson({
                    status: 'fail',
                    message: '添加群组失败',
                });
            }
        } catch (err) {
            console.log(err);
            this.renderJson({
                status: 'fail',
                message: err,
            });
        }
    }

    async modifyGroupName () {
        const group_id = this.params.group_id;
        const group_name = this.params.group_name;
        // 判断这个人是否有修改权限
        // 暂放在页面时判断吧
        try {
            const result = await this.shoppingListService.editGroup(group_id, {name: group_name,});
            this.renderJson({
                status: 'success',
                data: result,
            });
        } catch (err) {
            console.log(err);
            this.renderJson({
                status: 'fail',
                message: '修改群名称出错',
            });
        }
    }

    /**
     * 获取群组的详细信息
     * @memberOf ShoppingList
     */
    async getGroupInfo () {
        const group_id = this.params.group_id;
        try {
            let data = await this.shoppingListService.getGroupInfo(group_id);
            if (data) {
                data.members = await this.shoppingListService.getMemberByGroup(group_id);
                data.todos = await this.shoppingListService.getTodoListByGroup(group_id);
                this.renderJson({
                    status: 'success',
                    data: data,
                });
            } else {
                this.renderJson({
                    status: 'fail',
                    message: '获取群组信息出错',
                });
            }
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * 获取一个群组的清单列表
     * @memberOf ShoppingList
     */
    async getTodoList () {
        const group_id = this.params.group_id;
        try {
            const result = await this.shoppingListService.getTodoListByGroup(group_id);
            this.renderJson({
                status: 'success',
                data: result,
            });
        } catch (err) {
            console.log(err);
            this.renderJson({
                status: 'fail',
                message: err,
            });
        }
    }

    /**
     * 添加一个项目清单
     * @memberOf ShoppingList
     */
    async addTodo () {
        const presenter_id = this.params.login_string;
        const cont = this.params.cont;
        const group_id = this.params.group;
        try {
            const result = await this.shoppingListService.addTodo({
                group_id: group_id,
                todo_cont: cont,
                presenter_id: presenter_id,
            });
            this.renderJson({
                status: 'success',
                data: {todo_id: result,},
            });
        } catch (err) {
            console.log(err);
            this.renderJson({
                status: 'fail',
                message: err,
            });
        }
    }

    /**
     * 修改一个清单项的完成状态等
     * @memberOf ShoppingList
     */
    async changeTodoState () {
        const todo_id = this.params.todo_id;
        const uid = this.params.login_string;
        const state = this.params.state;
        try {
            const editData = {
                finisher_id: uid,
                state: state,
            };
            const result = await this.shoppingListService.editTodo(todo_id, editData);
            if (result.changedRows) {
                this.renderJson({
                    status: 'success',
                    data: result,
                });
            } else {
                this.renderJson({
                    status: 'fail',
                    message: '修改无效',
                });
            }
        } catch (err) {
            console.log(err);
            this.renderJson({
                status: 'fail',
                message: err,
            });
        }
    }

    /**
     * 将一个用户加入到群组中
     * @memberOf ShoppingList
     */
    async joinGroup () {
        const uid = this.params.login_string;
        const group_id = this.params.group_id;
        try {
            const result = await this.shoppingListService.joinGroup(group_id, uid);
            this.renderJson({
                status: 'success',
                data: {group_member_id: result,},
            });
        } catch (err) {
            console.log(err);
            this.renderJson({
                status: 'fail',
                message: '加入群组失败',
            });
        }
    }

}

export default ShoppingList;