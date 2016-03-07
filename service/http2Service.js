'use strict';

const Database = require('../common/database');

//添加一条记录
exports.add = function(data, callback) {
    Database.handle('INSERT INTO statistics SET ?', data, callback);
}

//通过hashid查找记录
exports.findByHashid = function(hashid, callback) {
    Database.handle('SELECT * FROM statistics s WHERE s.hash_id=?', hashid, callback);
}

//查出全部
exports.findAll = function(callback) {
    Database.handle('SELECT * FROM statistics s', null, callback);
}

//协议统计
exports.countProtocal = function(callback) {
    Database.handle('SELECT s.protocol, count(*) AS num FROM statistics s group by s.protocol', callback);
}

//分页查询
exports.findPage = function(page, callback) {
    let defaults = {
        orderby: 'id',
        nowPage: 1,
        pageSize: 20
    };
    defaults = Object.assign(defaults, page);
    Database.handle('SELECT SQL_NO_CACHE SQL_CALC_FOUND_ROWS * FROM statistics order by ? limit ?,?; SELECT FOUND_ROWS() AS total', 
                    [defaults.orderby, (defaults.nowPage - 1) * defaults.pageSize, defaults.pageSize],
                    callback);
}

//点击率加1
exports.addCTR = function(hashid, CTR, callback) {
    let _crt = parseInt(CTR, 10) || 1;
    Database.handle('UPDATE statistics s SET s.ctr=s.ctr+' + _crt + ' WHERE s.hash_id = ?', hashid, callback || () => {});
}