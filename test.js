'use strict';
const fs = require('fs'),
      path = require('path');

const filePath = './src';

console.log(fs.existsSync(filePath));
console.log(fs.statSync(filePath).isFile());

let realpath = path.join(process.cwd(), '/src');
let relatepath = path.relative(process.cwd(), realpath);

console.log(realpath);
console.log(relatepath);