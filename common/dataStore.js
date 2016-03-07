'use strict';

/*
 * 此数据存储库的意义
 * nodejs 是单线程异步，在等待回调过程中(比如查表、URL请求等)可以会有新的、一样 HASHID 的请求到来，
 * 此时会造成逻辑上的重叠，加此文件，可以使级短时间内同 HASHID 的操作不会重复
 * 解决问题： 可以解决插入同 HASHID 的记录； 可以将极短时间内同 HASHID 的点击率增加操作合并成一个
 */
let tempHashIds = {};

exports.add = function (hashId) {
    if (!tempHashIds[hashId]) {
        tempHashIds[hashId] = 1;
    }
}

exports.has = function (hashId) {
    if (tempHashIds[hashId]) {
        tempHashIds[hashId] ++;
        return true;
    } else {
        return false;
    }
}

exports.remove = function (hashId) {
    return (delete tempHashIds[hashId]);
}

exports.getCTR = function (hashId) {
    return parseInt(tempHashIds[hashId], 10);
}