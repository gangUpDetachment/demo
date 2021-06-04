const crypto = require("crypto");
//模拟得到明文
let str = "666666";
//为了安全起见，有两种防止被撞库的方法1.加密在加密多加密几层 2.给明文加一点盐
let salt = "...";
str += salt;
//确定使用哪一种消息摘要加密算法MD5 sha1 sha256 sha512
let sha1 = crypto.createHash("sha1");
const secretHash = sha1.update(str,"utf-8");
const secret =secretHash.digest("hex");
console.log(secret);