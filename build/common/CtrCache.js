'use strict';

/**
 * 一个简单的点击率数据缓存，可用来记录短时间内多次的同源访问
 * 将其用此缓存先存起来，到上次数据库操作结束后再进行一次性的数据写入
 * 
 */

var CtrCache = function CtrCache() {
    this.tempHashIds = {};
};

CtrCache.prototype.add = function (hashId) {
    if (!this.tempHashIds[hashId]) {
        this.tempHashIds[hashId] = 1;
    }
};

/*
 * 判断是否 hashid 已经在存在
 * 如果已经存在，点击率自加1
 */
CtrCache.prototype.has = function (hashId) {
    if (this.tempHashIds[hashId]) {
        this.tempHashIds[hashId]++;
        return true;
    } else {
        return false;
    }
};

CtrCache.prototype.remove = function (hashId) {
    return delete this.tempHashIds[hashId];
};

CtrCache.prototype.getCTR = function (hashId) {
    return parseInt(this.tempHashIds[hashId], 10);
};

module.exports = CtrCache;
//# sourceMappingURL=CtrCache.js.map
