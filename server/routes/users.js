var express = require('express');
var router = express.Router();
const { User } = require('../model/User')

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