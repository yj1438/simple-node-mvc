'use strict';

var Mysql = require('mysql');

var dbInfo = {
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

var pool = Mysql.createPool(dbInfo);

function handle(sql, data, callback) {
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log(err);
        } else {
            connection.query(sql, data, function (err, result) {
                callback.call(connection, err, result);
                connection.release();
            });
        }
    });
}

exports.handle = handle;
//# sourceMappingURL=database.js.map
