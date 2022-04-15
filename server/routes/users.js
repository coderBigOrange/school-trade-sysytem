var express = require('express');
var router = express.Router();
const { User } = require('../model/User')
const { Shop } = require('../model/Shop')
const { promisesWrap, getMessageInfo} = require('../utils/index')
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

//获取与用户相关的所有的消息（发出和收到的）
router.get('/allMessages', async (req, res, next) => {
  const { userEmail } = req.query;
  //拿到与用户相关的信息id
  const user = await User.findOne({
    userEmail: userEmail
  })
  const messageIds = user.userMessageList;
  console.log(messageIds)
  const data = await promisesWrap(messageIds, getMessageInfo)
  res.send({
    code: 200,
    message: '获取成功',
    data
  })
})
//获取用户的消息列表，列表页展示用
router.get('/messageList', async (req, res, next) => {
  const { userEmail } = req.query;
  //拿到与用户相关的信息id
  const user = await User.findOne({
    userEmail: userEmail
  })
  const data = user.messageList;
  res.send({
    code: 200,
    message: '获取成功',
    data
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

//用户发布商品
router.post('/publish', async(req, res, next) => {
  const {
    shopTitle,
    shopDescription,
    shopImgs,
    shopSort,
    shopPrice,
    shopOwnerEmail
  } = req.body;
  const shop = await Shop.create({
    shopTitle,
    shopDescription,
    shopImg:shopImgs,
    shopSort,
    shopOwnerEmail,
    shopPrice
  })
  res.send({
    code: 200,
    message: '发布成功',
    data: shop
  })
})

module.exports = router;