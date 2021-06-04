const fs = require("fs");
const path = require("path");
const readFilePath = path.resolve(__dirname,"theone.txt");
const writeFilePath = path.resolve(__dirname,"thetwo.txt");
//流式读取数据 创建可独流
const rs = fs.createReadStream(readFilePath);
const ws = fs.createWriteStream(writeFilePath,{
    flag:"a"
})
rs.pipe(ws);
rs.on("end",(err)=>{
    console.log("读取完毕");
})