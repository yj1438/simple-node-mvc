'use strict';

const Database = require('../common/database');

exports.add = function(data, callback) {
    Database.handle('INSERT INTO statistics SET ?', data, callback);
}

exports.findByHashid = function(hashid, callback) {
    Database.handle('SELECT * FROM statistics s WHERE s.hash_id=?', hashid, callback);
}

exports.findAll = function(callback) {
    Database.handle('SELECT * FROM statistics s', null, callback);
}

exports.countProtocal = function(callback) {
    Database.handle('SELECT s.protocol, count(*) AS num FROM statistics s group by s.protocol', callback);
}

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