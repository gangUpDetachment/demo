const express = require("express");

const router = new express.Router();

const path = require("path");

//引入当前用户信息集合
const uModel = require("../model/schema");

router.get("/register",async (req,res)=>{
    //查看用户输入内容 拿到用户名和密码
   // console.log(req.query);
   const {
       uname,
       password
   }= req.query;
   //查看用户的账号和密码是否为空
// if(!uname || !password){
//     const filepath = path.resolve(__dirname,"./public/err.ejs");
//     return res.render(filepath,{
//         data:"账号或者密码不能为空"
//     })
//    }
   //判断当前的用户名是否被注册
   //去数据库查询当前用户名
   const isHas = await uModel.findOne({
       uname
   })
   if(isHas){
       //拼接err.ejs路径
       const filepath = path.resolve(__dirname ,"../views/err.ejs");
       return res.render(filepath,{
           data:"用户名已经被注册"
       })
   };
   
   //向数据库写入当前用户信息
   const registerData = await uModel.create({
       uname,
       password
   });
   res.redirect("/login.html");
})


module.exports= router;