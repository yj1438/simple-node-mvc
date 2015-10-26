root.process.mainModule.paths.push(__dirname+'/../src');
var database = require('datasource');

/*database.session('INSERT INTO qz_member SET ?', {user_id:'9999'}, function (err, result) {
    console.log(result);
});*/
/*database.session('SELECT * FROM qz_member WHERE id = ? AND user_id = ? LIMIT 2;', [76359, 1089], function (err, result) {
    console.log(result);
});*/
/*database.session('UPDATE qz_member SET ? WHERE id=? and dept_id=?', [{user_id: 6666}, 76359, 0], function (err, result) {
    console.log(result);
});*/
/*database.session('DELETE FROM qz_member WHERE id = ? ', [76359], function (err, result) {
    console.log(result);
});*/

/**
* 查询方法
* callback : function(err, result)
*/
exports.query = function(sql, whereArr, callback){
    database.session(sql, whereArr, callback);
}

exports.insert = function(sql, paramObj, callback){
    database.session(sql, paramObj, callback);
}

exports.update = function(sql, paramObj, whereArr, callback){
    var valueArr = [paramObj];
    valueArr.concat(whereArr);
    database.session(sql, valueArr, callback);
}

exports.delete = function(sql, whereArr, callback){
    database.session(sql, whereArr, callback);
}

//test
/*exports.insert('INSERT INTO qz_member SET ?', {user_type: 1, user_id: 1005, dept_id: 2}, function(err, result){
    console.log(err);
    console.log(result);
})*/

exports.delete('DELETE FROM qz_member WHERE id in (?)', [[76360,76362,76363,76373,76379]],function(err, result){
    console.log(err);
    console.log(result);
})
