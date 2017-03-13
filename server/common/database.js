import Mysql from 'mysql';

class Database {

    /**
     * 数据库默认配置项
     * @static
     * @memberOf Database
     */
    static DATABASE_INFO = {
        host: '121.42.176.100',
        password: 'Yj@88.0101',
        user: 'root',
        database: 'http2',
        multipleStatements: true,
        acquireTimeout: 3000,
        waitForConnections: true,
        connectionLimit: 2048,
        queueLimit: 600,
    };

    /**
     * 取数据库单例
     * @static
     * @returns 
     * @memberOf Database
     */
    static getInstance () {
        if (!Database.instance) {
            Database.instance = new Database(Database.DATABASE_INFO);
        }
        return Database.instance;
    }

    constructor (databaseConfig) {
        this.DB_POOL = Mysql.createPool(databaseConfig);
    }
    
    /**
     * 从连接池中获取一个连接
     * @returns 
     * @memberOf Database
     */
    _getConnection() {
        return new Promise((resolve, reject) => {
            this.DB_POOL.getConnection((err, connection) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(connection);
                }
            });
        });
    }
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
    handle(sql, data, callback) {
        this._getConnection()
            .then((connection) => {
                connection.query(sql, data, (err, result) => {
                    callback.call(connection, err, result);
                    connection.release();
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }
    /**
     * 数据库执行 SQL 方法
     * sync
     * @static
     * @param {any} sql
     * @param {any} data
     * @returns Promise
     * 
     * @memberOf Database
     */
    async handleSync(sql, data) {
        let connection = null;
        try {
            connection = await this._getConnection();
        } catch (err) {
            console.log(err);
        }
        return new Promise((resolve, reject) => {
            if (connection) {
                connection.query(sql, data, (err, result) => {
                    /**
                     * sql检控
                     */
                    // console.log(new Date() + ': sql>>> ' + sql + ' data>>> ' + JSON.stringify(data));
                    if (err) {
                        console.log('sql: error' + err);
                        reject(err);
                        return;
                    }
                    resolve(result);
                    connection.release();
                });
            } else {
                reject('数据库链接获取失败');
            }
        });
    }
}

export default Database.getInstance();
