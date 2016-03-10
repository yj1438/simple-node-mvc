'use strict';

let CtrCache = function() {
    this.tempHashIds = {};
}

CtrCache.prototype.add = function (hashId) {
    if (!this.tempHashIds[hashId]) {
        this.tempHashIds[hashId] = 1;
    }
}

/*
 * 判断是否 hashid 已经在存在
 * 如果已经存在，点击率自加1
 */
CtrCache.prototype.has = function (hashId) {
    if (this.tempHashIds[hashId]) {
        this.tempHashIds[hashId] ++;
        return true;
    } else {
        return false;
    }
}

CtrCache.prototype.remove = function (hashId) {
    return (delete this.tempHashIds[hashId]);
}

CtrCache.prototype.getCTR = function (hashId) {
    return parseInt(this.tempHashIds[hashId], 10);
}

module.exports = CtrCache;