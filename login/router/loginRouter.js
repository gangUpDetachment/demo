const express = require("express");

const router = new express.Router();

const path = require("path");

//引入当前用户信息集合
const uModel = require("../model/schema");
//



// //权限控制
// router.use("/center.html",async(req,res,next)=>{
//     try{

    
//     const re = await uModel.findOne({
//         _id:req.cookies.userID
//     })
//     if(re){
//         next();
//     }else{
//         const filePath = path.resolve(__dirname,"../views/err.ejs");
//         return res.render(filePath,{
//             data:"用户名不存在"
//         })
//     }
// }catch(e){
//     const filePath = path.resolve(__dirname,"../views/err.ejs");
//     return res.render(filePath,{
//         data:"用户名不存在"
//     })

// }
// })


//登录
router.get("/login",async(req,res)=>{
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
       const filePath = path.resolve(__dirname,"../views/err.ejs");
       return res.render(filePath,{
           data:"用户名不存在"
       })
   };
  if(isHas.password!=password){
      const filePath = path.resolve(__dirname,"../views/err.ejs");
      return res.render(filePath,{
          data:"密码错误"
      })
  }
//cookie
res.cookie("userID",isHas._id,{
    maxAge:1000*3600*24,
    httpOnly:true
});



//登录成功跳转到个人中心
const filePath=path.resolve(__dirname,"../views/center.html")
res.sendFile(filePath);
})


module.exports= router;