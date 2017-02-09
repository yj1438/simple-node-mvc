'use strict';

import Database from '../common/database';

class ShoppingListService {

    constructor () {
        
    }

    /**
     * 
     * 
     * @param {any} openid
     * @returns
     * 
     * @memberOf ShoppingListService
     */
    async getMemberByOpenid (openid) {
        const sql = 'select * from member where openid = ?';
        let result = null;
        try {
            result = await Database.handleSync(sql, openid);
        } catch (err) {
            console.log(err);
        }
        return result;
    }


    /**
     * 
     * 
     * @param {any} memberInfo
     * @returns
     * 
     * @memberOf ShoppingListService
     */
    async registerMember (memberInfo) {
        const sql = 'insert into member set ?';
        const data = {
            openid: memberInfo.openId, 
            name: memberInfo.nickName, 
            nickname: memberInfo.nickName,
            avatar: memberInfo.avatarUrl
        };
        let result = null;
        try {
            result = await Database.handleSync(sql, data);
            console.log(result);
        } catch (err) {
            result = null;
            console.log(err);
        }
        return result;
    }

    /**
     * 
     * 
     * @param {any} openid
     * @returns
     * 
     * @memberOf ShoppingListService
     */
    async getGroupByMember (openid) {
        const sql = 'select * from group_info where id in (select group_id from group_member where openid = ?)';
        let result = null;
        try {
            result = await Database.handleSync(sql, openid);
        } catch (err) {
            console.log(err);
        }
        return result;
    }

    /**
     * 
     * 
     * @param {any} memberInfo
     * @param {any} groupInfo
     * @returns
     * 
     * @memberOf ShoppingListService
     */
    async createGroup (memberInfo, groupInfo) {
        const insertGroupInfoSql = 'insert into group_info set ?';
        // const insertGroupMemberSql = 'insert info group_member set ?';
        const groupData = {
            creator: memberInfo.openId,
            name: groupInfo.name || (memberInfo.name + '的清单'),
            create_ts: new Date().getTime()
        };
        let result1 = null,
            result2 = null;
        try {
            result1 = await Database.handleSync(insertGroupInfoSql, groupData);
        } catch (err) {
            console.log(err);
        }
        return result1;
        // const groupMember = {
        //     group_id: 
        // }
    }

}

export default ShoppingListService;