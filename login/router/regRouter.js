const express = require("express");

const router = new express.Router();

const path = require("path");

const fnnext=(req,res,next)=>{
    const{
        uname,
        password
    }=req.query;
    const uReg = /^[A-Z]{1}[0-9A-z_]{1,10}$/;
    const passReg = /^[0-9]{1,10}$/;
    if(!uReg.test(uname)|| !passReg.test(password)){
        const filePath=path.resolve(__dirname,"../views/err.ejs");
        return res.render(filePath,{
            data:"账号密码格式不对"
        })
    }
    next();
}

router.use("/login",fnnext);
router.use("/register",fnnext);


module.exports= router;