const mongoose = require("mongoose");

// 连接数据库，自动新建 ExpressApi 库
mongoose.connect('mongodb://localhost:27017/ExpressApi', {
  useNewUrlParser: true, // 避免“不建议使用当前URL字符串解析器”
  useUnifiedTopology: true, // 解决连接报错问题
}).then(() => console.log('连接数据库成功')).catch(() => console.log('连接数据库失败'))

module.exports =  mongoose;
