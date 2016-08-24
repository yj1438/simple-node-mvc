'use strict';

/**
 * hash 散列算法
 * 根据一个字符串生成 range 范围内的一个数
 * 用于数据库均匀分表
 */

/*
 * 加法 HASH
 */

exports.additiveHash = function (string, range) {
    var hash = void 0,
        i = void 0;
    for (hash = string.length, i = 0; i < string.length; i++) {
        hash = hash + string.charCodeAt(i);
    }
    return range ? hash % range : hash;
};

/*
 * 位运算 HASH
 */
exports.rotatingHash = function (string, range) {
    var hash = void 0,
        i = void 0;
    for (hash = string.length, i = 0; i < string.length; i++) {
        hash = hash << 4 ^ hash >> 28 ^ string.charCodeAt(i);
    }
    hash = range ? hash % range : hash;
    return Math.abs(hash);
};

/*
 * 乘法 HASH
 * 推荐乘数可以是31.131.13131.13131...
 * 
 */
exports.bernsteinHash = function (string, range) {
    var hash = 0,
        i = void 0;
    for (i = 0; i < string.length; i++) {
        hash = 31 * hash + string.charCodeAt(i);
    }return range ? hash % range : hash;
};

/*
 * 改进后的 FNVHash
 */
exports.FNVHash = function (string, range) {
    var p = 16777619,
        hash = 2166136261;
    for (var i = 0; i < string.length; i++) {
        hash = (hash ^ string.charCodeAt(i)) * p;
    }hash += hash << 13;
    hash ^= hash >> 7;
    hash += hash << 3;
    hash ^= hash >> 17;
    hash += hash << 5;
    return range ? hash % range : hash;
};
//# sourceMappingURL=Hash2Int.js.map
