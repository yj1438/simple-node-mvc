'use strict';

import Database from '../common/database';


class Http2Service {

    constructor() {

    }

    add(data, callback) {
        const result_promise = Database.handleSync('INSERT INTO statistics SET ?', data);
        result_promise.then((result) => {
            callback(null, result)
        }).catch((err) => {
            callback(err);
        });
        // Database.handle('INSERT INTO statistics SET ?', data, callback);
    }

    findByHashid(hashid, callback) {
        Database.handle('SELECT * FROM statistics s WHERE s.hash_id=?', hashid, callback);
    }

    findAll(callback) {
        Database.handle('SELECT * FROM statistics s', null, callback);
    }

    countProtocal(callback) {
        Database.handle('SELECT s.protocol, count(*) AS num FROM statistics s group by s.protocol', callback);
    }

    findPage(page, callback) {
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

    addCTR(hashid, CTR, callback) {
        let _crt = parseInt(CTR, 10) || 1;
        let _callback = callback || function () {};
        const result_promise = Database.handleSync('UPDATE statistics s SET s.ctr=s.ctr+' + _crt + ' WHERE s.hash_id = ?', hashid);
        result_promise.then((result) => {
            _callback(null, result);
        }).catch((err) => {
            _callback(err);
        })
        // Database.handle('UPDATE statistics s SET s.ctr=s.ctr+' + _crt + ' WHERE s.hash_id = ?', hashid, _callback);
    }

}

export default Http2Service;

