const fs = require ("fs");
const path = require("path");
//找文件路径或者创建路径
const filePath = path.resolve(__dirname,"theone.txt");
 function open(){
     return new Promise ((resolve,reject)=>{
         fs.open(filePath,"a",(err,fd)=>{
             if(err){
                 reject(err);
                 return;
             }
             resolve(fd);
         })
     })
 }
 function write(fd){
     return new Promise((resolve,reject)=>{
         fs.write(fd,"牵着你的手，",(err)=>{
           if(err){
               reject(err);
               return ;
           }
           resolve();
         })
     })
 }
 function close(fd){
     return new Promise((resolve,reject)=>{
         fs.close(fd,(err)=>{
             if(err){
                 reject(err);
                 return;
             }
             resolve("全部完成")
         })
     });
 }
 (async () =>{
     const fd = await open();
     await write(fd);
     const re = await close(fd);
     return re;
 })()
 .then ((data)=>{
     console.log(data);
 })
 .catch((err)=>{
     console.log(err);
 })