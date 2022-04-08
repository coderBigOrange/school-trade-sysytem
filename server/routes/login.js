const express = require('express');
const router = express.Router();
const { User } = require('../model/User')
const bcrypt  = require('bcrypt');
const jwt = require('jsonwebtoken');
const privateKey = 'bigOrange'

//TODO: 区分response的几个api json，send等等
// 用户注册
router.post('/register', async (req, res, next) => {
  const email = req.body.userEmail;
  const password = req.body.password;
  const isExist = await User.exists({
    userEmail: email
  })
  if(isExist) {
    res.send({
      code: 101,
      message: '用户已经存在',
    })
  } else {
    const user = await User.create({
      userEmail: email,
      password: password
    }) 
    res.send({
      code: 200,
      message: '注册成功',
      data: user
    })
  }
});
//用户登录
router.post('/login', async (req, res, next) => {
  const email = req.body.userEmail;
  const password = req.body.password;
  const user = await User.findOne({
    userEmail: email
  });
  if(user) {
    const userPassword =  (await User.findOne({userEmail: email}).select('password')).password
    const isValidPassWord =  bcrypt.compareSync(password, userPassword)
    if(!isValidPassWord){
      return res.send({
          code: 422,
          message:"密码错误",
      })
    }
    const token = jwt.sign({email},privateKey, {expiresIn: 3600})
    res.send({
      code: 200,
      message: '欢迎登录',
      data: {
        token
      }
    })
    
  } else {
    res.send({
      code: 422,
      message: '用户不存在'
    })
  }
})

module.exports = {
  loginRouter: router,
  privateKey
};
