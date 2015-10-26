var mysql = require('mysql');
//var _connectSession = null;
var db_config = {
    host     : '172.20.5.202',
    port     : '13306',
    user     : 'sst',
    password : 'uapsst123',
    database : 'yy'
}


//创建连接池
var pool  = mysql.createPool(db_config);

//监听connection事件
pool.on('connection', function(connection) {
    console.log('mysql database connect success!')
    connection.query('SET SESSION auto_increment_increment=1'); 
});

pool.on('error', function(err){
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
      pool  = mysql.createPool(db_config);               
    } else {                                      
      throw err;                                 
    }
})

var dbsession = function(sql, value, callback){
    pool.getConnection(function(err, connection){
        if(err){
            console.log('连接池获取连接失败！2秒后尝试重连。'+new Date());
            try{
                connection.end();
            }catch(e){
                console.log(e);
            }
            setTimeout(function(){dbsession(sql, callback);}, 2000);
        }else{
            //_connectSession = connection;
            connection.query(sql, value, function(err, result) {
                callback(err, result);
                connection.release();
            });
        }
    });
}

exports.session = dbsession;



