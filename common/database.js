'use strict';
const Mysql = require('mysql');

const dbInfo = {
    host: '172.16.9.142',
    user: 'root',
    password: 'root',
    database: 'http2',
    multipleStatements: true,
    acquireTimeout: 3000,
    waitForConnections: true,
    connectionLimit: 2048,
    queueLimit: 600
};

let pool = Mysql.createPool(dbInfo);
    
function handle(sql, data, callback) {
    pool.getConnection((err, connection) => {
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

exports.handle = handle;
