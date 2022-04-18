var express = require('express');
var router = express.Router();
const { User } = require('../model/User')
const { Shop } = require('../model/Shop')
const { promisesWrap, getMessageInfo} = require('../utils/index');
const { Types } = require('../db/mongodb');
// 获取用户信息
router.get('/info', async (req, res, next) => {
  const { email } = req.query;
  if(!email) {
    console.log(email)
    res.send({
      code: 500,
      message: '参数错误',
    })
    return
  }
  const user = await User.findOne({userEmail: email})
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
    shopImgs,
    shopSort,
    shopOwnerEmail,
    shopPrice
  })
  //更新用户的userPublishList
  await User.updateOne(
    {userEmail: shopOwnerEmail},
    {$push: {userPublishList: shop._id}}
  )
  res.send({
    code: 200,
    message: '发布成功',
    data: shop
  })
})

// 获取用户发布的商品
router.get('/userPublishList', async (req, res, next) => {
  const { email } = req.query
  if(!email) {
    console.log(email)
    res.send({
      code: 500,
      message: '参数错误',
    })
    return
  }
  const user = await User.findOne({
    userEmail: email
  })
  const {
    userAvatar,
    userName,
    userStudentInfo,
    userPublishList
  } = user;
  const publishListId = userPublishList.map(item => Types.ObjectId(item));
  const shopList = await Shop.find(
    {_id: {$in: publishListId}}
  )
  const data = shopList.map(item => {
    const { 
      shopOwnerEmail,
      shopTitle,
      shopDescription,
      shopPrice,
      shopSort,
      shopImgs,
      shopLike,
      ShopComment,
      shopCollect,
      _id,
      createTime
    } = item;
    return {
      shopOwnerEmail,
      shopTitle,
      shopDescription,
      shopPrice,
      shopSort,
      shopImgs,
      shopLike,
      ShopComment,
      shopCollect,
      shopId: _id,
      createTime,
      userAvatar,
      userName,
      userStudentInfo
    }
  })
  res.send({
    code: 200,
    message: '获取用户发布的商品列表成功',
    data
  })
})

router.post('/like', async(req,res, next) => {
  const { email, name, shopId } = req.body;
  const id = Types.ObjectId(shopId)
  await User.updateOne(
    {userEmail: email},
    {$push: {userLikeList: id}}
  )
  await Shop.updateOne(
    {_id: id},
    {$push: {shopLike: {email, name}}}
  )
  res.send({
    code: 200,
    message: '点赞成功',
  })
})

router.post('/cancelLike', async(req, res, next) => {
  const { email, shopId } = req.body;
  const id = Types.ObjectId(shopId)
  //将该商品从用户点赞列表中删除
  const user = await User.findOne(
    {userEmail: email}
  );
  const newLikeList = user.userLikeList.filter(item => !item.equals(id))
  await User.updateOne(
    {userEmail: email},
    {$set: {userLikeList: newLikeList}}
  )
  //从商品点赞列表中删除该用户信息
  const shop =  await Shop.findOne(
    {_id: id}
  )
  const newShopLike = shop.shopLike.filter(item => item.email !== email);
  await Shop.updateOne(
    {_id: id},
    {$set: {shopLike: newShopLike}}
  )
  res.send({
    code: 200,
    message: '取消点赞成功',
  })
})

router.post('/collect', async(req,res, next) => {
  const { email, name, shopId } = req.body;
  const id = Types.ObjectId(shopId)
  await User.updateOne(
    {userEmail: email},
    {$push: {userCollectList: id}}
  )
  await Shop.updateOne(
    {_id: id},
    {$push: {shopCollect: {email, name}}}
  )
  res.send({
    code: 200,
    message: '收藏成功',
  })
})

router.post('/cancelCollect', async(req, res, next) => {
  const { email, shopId } = req.body;
  const id = Types.ObjectId(shopId)
  //将该商品从用户收藏列表中删除
  const user = await User.findOne(
    {userEmail: email}
  );
  const newCollectList = user.userCollectList.filter(item => !item.equals(id))
  await User.updateOne(
    {userEmail: email},
    {$set: {userCollectList: newCollectList}}
  )
  //从商品收藏列表中删除该用户信息
  const shop =  await Shop.findOne(
    {_id: id}
  )
  const newShopCollect = shop.shopCollect.filter(item => item.email !== email);
  await Shop.updateOne(
    {_id: id},
    {$set: {shopCollect: newShopCollect}}
  )
  res.send({
    code: 200,
    message: '取消收藏成功',
  })
})

router.post('/comment', async(req, res, next) => {
  const { 
    content, 
    email, 
    avatar, 
    name,
    shopId,
  } = req.body;
  const id = Types.ObjectId(shopId)
  const comment = {
    content,
    email,
    avatar,
    name,
    createTime: new Date(),
    likeCnt: 0
  }
  //将该商品id加入用户的评论清单
  const user = await User.findOne(
    {userEmail: email}
  )
  const isIn = user.userCommentList.find(
    item => item.equals(shopId)
  )
  if(!isIn) {
    await User.updateOne(
      {userEmail: email},
      {$push: {userCommentList: id}}
    )
  }
  //将评论加入商品的评论列表
  await Shop.updateOne(
    {_id: id},
    {$push: {ShopComment: comment}}
  )
  res.send({
    code: 200,
    message: '评论成功',
    data: comment
  })
})

// router.post('/subscribe', (req,res,next) => {
//   const { selfEmail, otherEmail } = req.body;

// })

module.exports = router;