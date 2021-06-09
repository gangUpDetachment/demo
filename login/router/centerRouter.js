const express = require("express");
const router = new express.Router();
const path = require("path");
const uModel = require("../model/schema");
//
const cookieParser = require("cookie-parser");
//获取cookie并且把cookie以对象的形象呈现
router.use(cookieParser());


//权限控制
router.use("/center.html",async (req,res,next)=>{
     console.log(req.cookies);

   if(req.cookies.userID){
    try{
        const re = await uModel.findOne({
            _id: req.cookies.userID
        })
        if(re){
            next();
        }else{
            const filePath = path.resolve(__dirname,"../views/err.ejs");
            return res.render(filePath,{
                data:"权限不足，请重新登录访问"
            })
        }
    }catch(e){

        const filePath = path.resolve(__dirname,"../views/err.ejs");
        return res.render(filePath,{
            data:"权限不足，请重新登录"
        })
    }

    }else{

        const filePath = path.resolve(__dirname,"../views/err.ejs");
        return res.render(filePath,{
            data:"权限不足，请重新登录"
        })
    }

})
router.get("/center.html",(req,res)=>{
    const filePath= path.resolve(__dirname,"../views/center.html")
    res.sendFile(filePath);
})
module.exports =router;