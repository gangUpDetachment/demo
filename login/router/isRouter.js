const express = require("express");

const router = new express.Router();

const path = require("path");

const isEmptyFn =(req,res,next)=>{
    const{
        uname,
        password
    }=req.query;
    if(!uname || !password){
        const filePath = path.resolve(__dirname,"../views/err.ejs");
        return res.render(filePath,{
            data:"账号密码不能为空"
        })
    }
    next();
}

router.use("/login",isEmptyFn)
router.use("/register",isEmptyFn)


module.exports= router;