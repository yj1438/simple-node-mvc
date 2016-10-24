'use strict';

/**
 * hash 散列算法
 * 根据一个字符串生成 range 范围内的一个数
 * 用于数据库均匀分表
 */

class Hash2Init {

    /**
     * 加法 hash
     * 
     * @static
     * @returns
     * 
     * @memberOf Hash2Init
     */
    static additiveHash(string, range) {
        let hash,
            i;
        for (hash = string.length, i = 0; i < string.length; i++) {
            hash = hash + string.charCodeAt(i);
        }
        return range ? (hash % range) : hash;
    }

    /**
     * 位运算 HASH
     * 
     * @param {any} string
     * @param {any} range
     * @returns
     * 
     * @memberOf Hash2Init
     */
    rotatingHash(string, range) {
        let hash,
            i;
        for (hash = string.length, i = 0; i < string.length; i++) {
            hash = (hash << 4) ^ (hash >> 28) ^ string.charCodeAt(i);
        }
        hash = range ? (hash % range) : hash;
        return Math.abs(hash);
    }

    /**
     * 乘法 hash
     * 推荐乘数可以是31.131.13131.13131...
     * 
     * @param {any} string
     * @param {any} range
     * @returns
     * 
     * @memberOf Hash2Init
     */
    bernsteinHash(string, range) {
        let hash = 0,
            i;
        for (i = 0; i < string.length; i++)
            hash = 31 * hash + string.charCodeAt(i);
        return range ? (hash % range) : hash;
    }

    /**
     * 改进后的 FNVHash
     * 
     * @param {any} string
     * @param {any} range
     * @returns
     * 
     * @memberOf Hash2Init
     */
    FNVHash(string, range) {
        let p = 16777619,
            hash = 2166136261;
        for (let i = 0; i < string.length; i++)
            hash = (hash ^ string.charCodeAt(i)) * p;
        hash += hash << 13;
        hash ^= hash >> 7;
        hash += hash << 3;
        hash ^= hash >> 17;
        hash += hash << 5;
        return range ? (hash % range) : hash;
    }

}

export default Hash2Init;