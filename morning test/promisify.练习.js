const fs = require("fs");
const path = require("path");
const filePath = path.resolve(__dirname,"theone.txt");
const {
    promisify
}=require("util");
//使用promisify处理异步方法
const open = promisify(fs.open);
const write = promisify(fs.write);
const close = promisify(fs.close);
(async () =>{
    const
})