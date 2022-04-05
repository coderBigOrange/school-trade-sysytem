const  { privateKey } = require( "../routes/login");
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  const userToken = (req.headers.authorization)
  const jwtVerify = jwt.verify(userToken, privateKey, (err, decoded) => {
    if(err) {
      console.log(err);
      return false;
    } else {
      //TODO: 处理token过期逻辑
      return decoded
    }
  })
  if(!jwtVerify) {
    res.send({
      code: 401,
      message: '没有权限',
    })
  } else {
    next();
  }
}

module.exports = auth;