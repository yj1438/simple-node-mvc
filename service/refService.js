'use strict';

const Database = require('../common/database');
const ProtocolMap = {
    '1': 'http1',
    '2': 'spdy2',
    '3': 'spdy3',
    '3.1': 'spdy3_1',
    '4': 'http2'
}; 
/**
 * 记录点击率
 * data: id-id ref-来源 (protocal)-参照ProtocolMap的 key
 * 通过ON DUPLICATE KEY UPDATE语法，实现一句 SQL 有则加1，无则添加的功用
 */
exports.addCTR = function(data, callback) {
    //INSERT INTO stat_ref(id, ref, http1) values ('babytree', 'babytree', 1) ON DUPLICATE KEY UPDATE http1 = http1 + 1;
    let id = data.id,
        ref = data.ref,
        protocol = ProtocolMap[data.protocol];
    if (!id || !ref || !protocol) {
        callback && callback('参数错误', null);
        return;
    }
    let sql = "INSERT INTO stat_ref(id, ref, " + protocol + ") values ('" + id + "', '" + ref + "', 1)"
         + " ON DUPLICATE KEY UPDATE " + protocol + " = " + protocol + " + 1;";
    let _callback = callback || function() {};
    Database.handle(sql, {}, _callback);
}


/**
 * 根据 ref 获取此条记录
 */
exports.findByRef = function(ref, callback) {
    Database.handle('SELECT * FROM stat_ref a WHERE a.ref = ?', ref, callback);
}