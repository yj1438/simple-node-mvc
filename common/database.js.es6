import Mysql form 'mysql';

const dbInfo = {
    host: '172.16.9.141',
    user: 'root',
    password: 'root',
    database: 'http2',
    acquireTimeout: 10000,
    waitForConnections: true,
    connectionLimit: 300,
    queueLimit: 0
};

class Database {
    constructor() {
        this.pool = Mysql.createPool(dbInfo);
    }
    
    do(sql, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) {
                console.log(err);
            } else {
                connection.query(sql, () => {
                    callback.apply(connection, arguments);
                });
            }
        });
    }
    
}

export default Database;