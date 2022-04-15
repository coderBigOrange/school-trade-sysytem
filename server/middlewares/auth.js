const  { privateKey } = require( "../routes/login");
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  const userToken = (req.headers.authorization)
  const jwtVerify = jwt.verify(userToken, privateKey, (err, decoded) => {
    if(err) {
      console.log(err);
      return false;
    } else {
      return decoded
    }
  })
  if(!jwtVerify) {
    res.send({
      code: 401,
      message: 'token无效或过期',
    })
  } else {
    next();
  }
}

module.exports = auth;