//连接数据库
require("./db");
//引入当前用户信息集合
const uModel = require("./model/schema");
//连接mongoose
const mongoose = require("mongoose");
//引入express
const express = require("express");
//引入path
const path = require("path");
//使用express的applocation对象
const app =  express();
//引入ejs
const ejs = require("ejs");
//通知express使用ejs模板引擎
app.set("view engine","ejs");
app.set("views","views");
//官方的静态资源中间件
app.use(express.static("./public"));
app.use(express.static("./static"));
//处理req请求携带的数据的中间件，把req的数据放在了req.body的属性上
app.use(express.urlencoded({
    extended:true
}))
//处理账号和密码是否为空的中间件
app.use((req,res,next)=>{
    const{
        uname,
        password
    }=req.query;
    if(!uname || !password){
        const filePath = path.resolve(__dirname,"./public/err.ejs");
        return res.render(filePath,{
            data:"账号密码不能为空"
        })
    }
    next();
})
//查看用户输入内容 拿到用户名和密码
app.use((req,res,next)=>{
    const{
        uname,
        password
    }=req.query;
    const uReg = /^[A-Z]{1}[0-9A-z_]{6,10}$/;
    const passReg = /^[0-9]{6}$/;
    if(!uReg.test(uname)|| !passReg.test(password)){
        const filePath=path.resolve(__dirname,"./public/err.ejs");
        return res.render(filePath,{
            data:"账号密码格式不对"
        })
    }
    next();
})




//图片接口
app.get("/static/:src",(req,res)=>{
    const{
        src
    }=req.params;
 const filePath = path.resolve(__dirname,"./static",src);
 res.sendFile(filePath);
})

//注册接口
app.get("/register",async (req,res)=>{
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
       const filepath = path.resolve(__dirname ,"./public/err.ejs");
       return res.render(filePath,{
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

//登录接口
app.get("/login",async(req,res)=>{
    const{
        uname,
        password
    }=req.query;
    //查看用户名的账号密码是否为空
    // if(!uname || !password){
    //     //拼接err.ejs路径
    //     const filePath =path.resolve(__dirname,"./public/err.ejs");
    //     return res.render(filePath,{
    //         data:"账号密码不能为空"
    //     })
    // }
   const isHas = await uModel.findOne({
       uname
   })
   if(!isHas){
       const filePath = path.resolve(__dirname,"./public/err.ejs");
       return res.render(filePath,{
           data:"用户名不存在"
       })
   };
  if(isHas.password!=password){
      const filePath = path.resolve(__dirname,"./public/err.ejs");
      return res.render(filePath,{
          data:"密码错误"
      })
  }
//登录成功跳转到个人中心
const filePath=path.resolve(__dirname,"./public/center.html")
res.sendFile(filePath);
})



// //默认路径是index.html
// app.get("/",(req,res)=>{
//     //访问根目录则默认重定向到index.html
//     res.redirect("/index.html")
// })
// //index.html的路径
// app.get("/index.html",(req,res)=>{
//     //获取index.html的路径
//     const filePath = path.resolve(__dirname,"./public/index.html");
//     res.sendFile(filePath);
// })
// app.get("/login.html",(req,res)=>{
//     const filePath=path.resolve(__dirname,"./public/login.html");
//     res.sendFile(filePath);
// })
// app.get("/register.html",(req,res)=>{
//     const filePath = path.resolve(__dirname,"./public/register.html");
//     res.sendFile(filePath);
// })

//服务启动监听
let post = 8800;
app.listen(post,err=>{
    if(err){
    console.log(err);
    return;
    }
    console.log("服务器启动成功，请访问"+`http://127.0.0.1:${post}`);
})