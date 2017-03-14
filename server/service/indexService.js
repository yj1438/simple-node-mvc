import Database from '../common/database'; 

/**
 * 
 * 
 * @class IndexService
 */
class IndexService {

    constructor () {
        
    }

    getMessage () {
        return '这是一条最简单的消息';
    }

    /**
     * 一个操作数据库的例子
     * @param {string} uid 
     * @returns 
     * @memberOf IndexService
     */
    /* eg
    async getUser (uid) {
        const sql = 'select * from user where id = ?';
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
    */
}

export default IndexService;