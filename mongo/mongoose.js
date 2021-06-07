//引入monsooge数据库
const mongoose = require("mongoose");
//连接数据库

mongoose.connect("mongodb://127.0.0.1:27017/briefs",{
    useNewUrlParser: true ,
    useUnifiedTopology: true 
})
mongoose.connection.once("open",err=>{
    if(err){
        console.log(err);
        return;
    }
    console.log("数据库连接成功");
})
//创建Schema对象,方便未来对某个集合的值进行约束
const three = new mongoose.Schema({
    name:{
        type:String,
        unique:true,//唯一存在
        required:true//必填项
    },
    age:Number,
    sex:String,
    //hobby:Array//限制值必须是一个数组
    hobby:[String],
    createTime:{
        type:Date,
        default:Date.now
    }
});
//创建model对象（集合）
const content1 = mongoose.model("content",three);
//增加多个文档
content1.create([{
    name:"王四",
    age:22,
    sex:"女",
    hobby:["rap","backgetball"],
    creatTime:Date.now()
},{
    name:"王五",
    age:22,
    sex:"女",
    hobby:["rap","backgetball"],
    creatTime:Date.now()
},{
    name:"王流",
    age:12,
    sex:"女",
    hobby:["rap","backgetball"],
    creatTime:Date.now()
}])
