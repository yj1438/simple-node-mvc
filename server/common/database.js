'use strict';

import Mysql from 'mysql';

const DATABASE_INFO = {
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

const DB_POOL = Mysql.createPool(DATABASE_INFO);

class Database {

    static handle(sql, data, callback) {
        DB_POOL.getConnection((err, connection) => {
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
