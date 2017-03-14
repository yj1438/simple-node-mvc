'use strict';

import url from 'url';
import path from 'path';
import fs from 'fs';

import config from '../config/config';
import HttpBase from './HttpBase';


const StaticDir = path.resolve(process.cwd(), '..', config.staticFileDir);

class StaticContent extends HttpBase{

    constructor(req, res) {
        super(req, res);
    }

    handle(filePath) {
        if (!filePath) {
            filePath = path.join(StaticDir, url.parse(this.req.url).pathname);
        }
        // console.log(filePath);
        //进行目录权限的判断
        let relativePath = path.relative(StaticDir, filePath);
        if (relativePath.indexOf('..') > -1) {
            this._404(this.req, this.res);
            return;
        }
        //如是不存在或不是文件
        if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
            this._404(this.req, this.res);
            return;
        }
        
        //
        let fileStream,
            resHeaders = {},
            extName;
        
        //打开缓存
        if (config.cacheControl && config.cacheControl > 0) {
            resHeaders['Cache-Control'] = 'max-age=' + config.cacheControl;
            resHeaders['Expires'] = new Date(new Date().getTime() + (config.cacheControl * 1000));
        } else {
            resHeaders = {
                //把静态的缓存去掉
                'Cache-Control': 'no-cache',
                'Expires': new Date() - 1
            };
        }
        try {
            fileStream = fs.createReadStream(filePath);
            extName = path.extname(filePath);
            extName = extName ? extName.slice(1) : 'html';
            this.out(fileStream, extName, resHeaders);
        } catch (err) {
            this._500(this.req, this.res, err);
            return;
        }
    }

}

export default StaticContent;