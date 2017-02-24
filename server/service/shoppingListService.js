'use strict';

import Database from '../common/database';

class ShoppingListService {

    constructor () {
        
    }

    /**
     * 通过 openid 来获取用户信息
     * 
     * @param {any} openid
     * @returns
     * 
     * @memberOf ShoppingListService
     */
    async getMemberByUid (uid) {
        const sql = 'select * from member where id = ?';
        let result = null;
        try {
            result = await Database.handleSync(sql, uid);
            if (result.length > 0) {
                result = result[0];
            } else {
                result = null;
            }
        } catch (err) {
            console.log(err);
        }
        return result;
    }

    /**
     * 通过 openid 来获取用户信息
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
            if (result.length > 0) {
                result = result[0];
            } else {
                result = null;
            }
        } catch (err) {
            console.log(err);
        }
        return result;
    }

    /**
     * 注册用户
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
            avatar: memberInfo.avatarUrl,
            create_ts: new Date().getTime(),
        };
        let result = null;
        try {
            result = await Database.handleSync(sql, data);
        } catch (err) {
            console.log(err);
        }
        return result;
    }

    /**
     * 获取某一个用户的参加的群组
     * @param {any} openid
     * @returns
     * 
     * @memberOf ShoppingListService
     */
    async getGroupByMember (uid) {
        const sql = `select * from (select * from group_info a where id in (select group_id from group_member where member_id = ?)) t
                    left join (
                        select group_id as group_id_m, count(group_id) as count_member
                        from group_member group by group_id
                    ) t1
                    on t.id = t1.group_id_m
                    left join (
                        select group_id as group_id_t, count(group_id) as count_todo
                        from group_todos where state=0 group by group_id
                    ) t2
                    on t.id = t2.group_id_t
                    order by t.create_ts desc
                    `;
        let result = null;
        try {
            result = await Database.handleSync(sql, uid);
        } catch (err) {
            console.log(err);
        }
        return result;
    }

    /**
     * 创建群组
     * @param {any} memberInfo
     * @param {any} groupInfo
     * @returns
     * @memberOf ShoppingListService
     */
    async createGroup (memberInfo, groupInfo) {
        const insertGroupInfoSql = 'insert into group_info set ?';
        // const insertGroupMemberSql = 'insert into group_member set ?';
        const groupData = {
            creator_id: memberInfo.id,
            name: groupInfo.name || (memberInfo.name + '的清单'),
            create_ts: new Date().getTime(),
        };
        // const groupMemberData = {
        //     group_id: '',
        //     member_id: memberInfo.id,
        //     create_ts: new Date().getTime(),
        // };
        let result = null,
            result_member = null;
        try {
            result = await Database.handleSync(insertGroupInfoSql, groupData);
            result_member = await this.joinGroup(result.insertId, memberInfo.id);
        } catch (err) {
            console.log(err);
        }
        return {
            group_id: result.insertId,
            group_member_id: result_member,
        };
    }

    /**
     * 将某一用户拉进群组
     * 
     * @param {any} group_id 
     * @param {any} member_id 
     * @returns 
     * 
     * @memberOf ShoppingListService
     */
    async joinGroup (group_id, member_id) {
        const findGroupMember = 'select a.id from group_member a where a.group_id=? and member_id=?'
        const insertGroupMemberSql = 'insert into group_member set ?';
        const sqlData = {
            group_id: group_id,
            member_id: member_id,
            create_ts: new Date().getTime(),
        };
        let hasjoined = false;
        let result = null;
        try {
            hasjoined = await Database.handleSync(findGroupMember, [group_id, member_id,]);
            if (hasjoined.length > 0) {
                result = hasjoined[0].id;
            } else {
                result = await Database.handleSync(insertGroupMemberSql, sqlData);
                result = result.insertId;
            }
        } catch (err) {
            console.log(err);
        }
        return result;
    }

    async getGroupInfo (group_id) {
        const sql = `select a.id, a.creator_id, b.name as creator_name, a.name, b.avatar, a.create_ts from group_info a 
                    left join member b
                    on (a.creator_id = b.id)
                    where a.id = ?`;
        let result = null;
        try {
            result = await Database.handleSync(sql, group_id);
            if (result.length > 0) {
                result = result[0];
            } else {
                result = null;
            }
        } catch (err) {
            console.log(err);
        }
        return result;
    }

    /**
     * 修改群组在的基本信息
     * 目前只是用来修改名称的
     * @param {any} group_id 
     * @param {any} data 
     * @returns 
     * @memberOf ShoppingListService
     */
    async editGroup (group_id, data) {
        const sql = 'update group_info a set ? where a.id = \'' + group_id + '\'';
        let result = null;
        try {
            result = await Database.handleSync(sql, data);
            if (result.changedRows) {
                result = true;
            } else {
                result = false;
            }
        } catch (err) {
            console.log(err);
        }
        return result;
    }

    async getMemberByGroup (group_id) {
        const sql = 'select a.group_id, a.member_id, b.name, b.nickname, b.avatar from group_member a, member b where a.`member_id` = b.`id` and a.`group_id` = ?';
        let result = [];
        try {
            result = await Database.handleSync(sql, group_id);
        } catch (err) {
            console.log(err);
        }
        return result;
    }

    async getTodoListByGroup (group_id) {
        const sql = `select a.id, a.todo_cont, a.present_ts, a.finish_ts, a.state, b.id as presenter_id, b.name as presenter_name, b.avatar as presenter_avatar, c.id as finisher_id, c.name as finisher_name, c.avatar as finisher_avatar 
                from group_todos a
                left join member b 
                on (a.presenter_id = b.id)
                left join member c
                on (a.finisher_id = c.id)
                where group_id = ?`;
        let result = [];
        try {
            result = await Database.handleSync(sql, group_id);
        } catch (err) {
            console.log(err);
        }
        return result;
    }

    /**
     * 添加一个 todo 清单项目
     * 
     * @param {any} todoInfo 
     *  {
     *      group_id
     *      todo_cont
     *      presenter_id
     *  }
     * @returns 
     * 
     * @memberOf ShoppingListService
     */
    async addTodo (todoInfo) {
        const sql = 'insert into group_todos set ?';
        todoInfo.present_ts = new Date().getTime();
        todoInfo.state = 0;
        let result = null;
        try {
            result = await Database.handleSync(sql, todoInfo);
            result = result.insertId;
        } catch (err) {
            console.log(err);
        }
        return result;
    }

    async countMemberByGroup (group_id) {
        const sql = 'select count(*) as count from group_member where group_id=?';
        let result = 0;
        try {
            result = await Database.handleSync(sql, group_id);
            if (result.length > 0) {
                result = result[0].count;
            } else {
                result = 0;
            }
        } catch (err) {
            console.log(err);
        }
        return result;
    }

    async countTodoByGroup (group_id, state) {
        const sql = 'select count(*) as count from group_todos where group_id=?'
            + (state !== undefined ? (' and state=' + state) : '');
        let result = 0;
        try {
            result = await Database.handleSync(sql, group_id);
            if (result.length > 0) {
                result = result[0].count;
            } else {
                result = 0;
            }
        } catch (err) {
            console.log(err);
        }
        return result;
    }

    async editTodo (todoId, todoInfo) {
        const sql = 'update group_todos a set ? where a.id=\'' + todoId + '\'';
        let result = 0;
        try {
            result = await Database.handleSync(sql, todoInfo);
        } catch (err) {
            console.log(err);
        }
        return result;
    }
}

export default ShoppingListService;