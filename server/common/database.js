'use strict';

import Mysql from 'mysql';

const DATABASE_INFO = {
    host: '121.42.176.100',
    user: 'root',
    password: 'Yj@88.0101',
    database: 'wx_shoplist',
    multipleStatements: true,
    acquireTimeout: 3000,
    waitForConnections: true,
    connectionLimit: 2048,
    queueLimit: 600
};

const DB_POOL = Mysql.createPool(DATABASE_INFO);

function getConnection() {
    return new Promise((resolve, reject) => {
        DB_POOL.getConnection((err, connection) => {
            if (err) {
                reject(err);
            } else {
                resolve(connection);
            }
        });
    });
}

class Database {

    /**
     * 数据库执行 SQL 方法
     * 
     * @static
     * @param {any} sql
     * @param {any} data
     * @param {any} callback
     * 
     * @memberOf Database
     */
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
    

    /**
     * 数据库执行 SQL 方法
     * sync
     * 
     * @static
     * @param {any} sql
     * @param {any} data
     * @returns Promise
     * 
     * @memberOf Database
     */
    static async handleSync(sql, data) {
        let connection = null;
        try {
            connection = await getConnection();
        } catch (err) {
            console.log(err);
        }
        return new Promise((resolve, reject) => {
            if (connection) {
                connection.query(sql, data, (err, result) => {
                    console.log('sql: >>> ' + sql + ' data: >>> ' + JSON.stringify(data));
                    if (err) {
                        console.log('sql: error' + err);
                        reject(err);
                        return;
                    }
                    resolve(result);
                });
            } else {
                reject('数据库链接获取失败');
            }
        });
        // let promise =  new Promise((resolve, reject) => {
        //     DB_POOL.getConnection((err, connection) => {
        //         if (err) {
        //             reject(err);
        //             return;
        //         }
        //         resolve(connection);
        //     });
        // });
        // return promise
        //     .then((connection) => {
        //         return new Promise((resolve, reject) => {
        //             connection.query(sql, data, (err, result) => {
        //                 if (err) {
        //                     reject(err);
        //                     return;
        //                 }
        //                 resolve(result);
        //             });
        //         });
        //     }).catch((err) => {
        //         console.log(err);
        //     })
    }
}

export default Database;
