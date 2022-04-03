var express = require('express');
var router = express.Router();
const { User } = require('../model/User')
const bcrypt  = require('bcrypt');

// 用户注册
router.post('/register', async (req, res, next) => {
  const email = req.body.userEmail;
  const password = req.body.password;
  const isExist = await User.exists({
    userEmail: email
  })
  if(isExist) {
    res.json({
      code: 101,
      message: '用户已经存在',
      data: null,
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
  }).select('password');
  if(user) {
    const isValidPassWord =  bcrypt.compareSync(password, user.password)
    if(!isValidPassWord){
      return res.status(422).send({
          message:"密码无效"
      })
    }
    res.send({
      code: 200,
      message: '欢迎登录',
      data: null
    })
    
  } else {
    res.send('用户不存在')
  }
})
// 获取用户信息
router.get('/info', async (req, res, next) => {
  const user = await User.findOne({
    _id: req.user_id  })
  res.send({
    code: 200,
    message: '获取成功',
    data: user
  })
})

// 获取用户列表
router.get('/list', async(req, res, next)=>{
  const user = await User.find()
  res.send({ 
    code: 200,
    message: '获取成功',
    data: user
  })
})

module.exports = router;
