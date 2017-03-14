'use strict';
const readline = require('readline');
const fs = require('fs');
const http2Service = require('../service/http2Service');

const rl = readline.createInterface({
    input: fs.createReadStream('data/ua_data.json')
});

/**
 * 将原来保存在文件中的数据读到数据库中
 *
 */
rl.on('line', (line) => {
    let uaData,
        saveData;
    try {
        uaData = JSON.parse(line);
        saveData = {
            hash_id: uaData.hashId,
            agent_name: uaData.agent_name,
            agent_version: uaData.agent_version,
            os_name: uaData.os_name,
            os_version: uaData.os_version,
            is_spdy: uaData.isSpdy ? 1 : 0,
            protocol: uaData.protocol,
            ua_string: uaData.uaString
        };
        http2Service.add(saveData, (err, rows) => {
            console.log(rows.insertId);
        })
    } catch (err) {
        console.log(err);
    }
}).on('close', (e) => {
    console.log(e);
});

/*
const rl = readline.createInterface({
        input: fs.createReadStream('data/ua_data.json')
    });
    rl.on('line', (line) => {
        uaListData.push(JSON.parse(line));
    }).on('close', () => {
        callback(uaListData);
    });
*/