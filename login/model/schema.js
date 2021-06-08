const mongoose = require("mongoose");
const uselog = new mongoose.Schema({
    uname:{
        type:String,
        unique:true,
        required:true
    },
    password:{
       type:String,
       required:true
    }
})
//使用model模块管理
const names = mongoose.model("useuse",uselog)
//暴露接口
module.exports = names;
