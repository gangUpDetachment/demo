const  mongoose = require("mongoose");
 mongoose.connect("mongodb://127.0.0.1:27017/log",{
    useNewUrlParser: true,
    useUnifiedTopology: true
 })
 //绑定监听事件
 mongoose.connection.once("open",err=>{
     if(err){
         console.log(err);
         return
     }
     console.log("数据库连接成功");
 })