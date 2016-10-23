'use strict';

import Mysql from 'mysql';

class Database {

    static DATABASE_INFO = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'http2',
        multipleStatements: true,
        acquireTimeout: 3000,
        waitForConnections: true,
        connectionLimit: 2048,
        queueLimit: 600
    };

    static pool = Mysql.createPool(DATABASE_INFO);

    static handle() {
        this.pool.getConnection((err, connection) => {
            if (err) {
                console.log(err);
            } else {
                connection.query(sql, data, (err, result) => {
                    callback.call(connection, err, result);
                    connection.release();
                });
            }
        });
    }
}

export default Database;


// const Mysql = require('mysql');

// const dbInfo = {
//     host: 'localhost',
//     user: 'root',
//     password: '123456',
//     database: 'http2',
//     multipleStatements: true,
//     acquireTimeout: 3000,
//     waitForConnections: true,
//     connectionLimit: 2048,
//     queueLimit: 600
// };

// let pool = Mysql.createPool(dbInfo);
    
// function handle(sql, data, callback) {
//     pool.getConnection((err, connection) => {
//         if (err) {
//             console.log(err);
//         } else {
//             connection.query(sql, data, (err, result) => {
//                 callback.call(connection, err, result);
//                 connection.release();
//             });
//         }
//     });
// }

exports.handle = handle;
