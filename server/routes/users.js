var express = require('express');
var router = express.Router();
const { User } = require('../model/User')
const { Shop } = require('../model/Shop')
const { Types } = require('../db/mongodb');
const { getShopUserInfo, promisesWrap } = require('../utils');

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

//删除消息列表某一项
router.post('/deleteMessageItem', async(req,res,next) => {
  const { selfEmail, otherEmail } = req.body;
  const user = await User.findOne({
    userEmail: selfEmail
  })
  const messageList = user.messageList.filter(item => item.email !== otherEmail)
  await User.updateOne(
    {userEmail: selfEmail},
    {
      $set: {messageList: messageList}
    }
  )
  res.send({
    code: 200,
    message: '删除成功',
    data: messageList
  })
})

//置顶消息列表某一项
router.post('/pinMessageItem', async(req,res,next) => {
  const { selfEmail, otherEmail } = req.body;
  const user = await User.findOne({
    userEmail: selfEmail
  })
  const messageList = user.messageList || [];
  const index = messageList.findIndex(item => item.email === otherEmail)
  const messgaeItem = messageList[index];
  messageList.splice(index, 1);
  messageList.unshift(messgaeItem)
  
  await User.updateOne(
    {userEmail: selfEmail},
    {
      $set: {messageList: messageList}
    }
  )
  res.send({
    code: 200,
    message: '置顶成功',
    data: messageList
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
    shopOwnerEmail,
    link
  } = req.body;
  const shop = await Shop.create({
    shopTitle,
    shopDescription,
    shopImgs,
    shopSort,
    shopOwnerEmail,
    shopPrice,
    link
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
//获取用户关注用户发布的商品
router.get('/subscribeShops', async(req, res, next) => {
  const {email} = req.query;
  if(!email) {
    res.send({
      code: 500,
      message: '参数错误',
    })
    return;
  }
  const user = await User.findOne({
    userEmail: email
  })
  const shopList  = await Shop.find(
    {shopOwnerEmail: {$in: user.userSubscribe}}
  )
  const data = await promisesWrap(shopList, getShopUserInfo);
  res.send({ 
    code: 200,
    message: '获取订阅用户发布的商品成功',
    data
  })
})

//用户改变商品上/下架状态
router.post('/unPublish', async (req,res,next) => {
  const { shopId, shopState } = req.body;
  await Shop.updateOne(
    {_id: Types.ObjectId(shopId)},
    {shopState: shopState}
  )
  return res.send({
    code: 200,
    message: '操作成功',
  })
})

//获取用户发布，点赞，评论，收藏的商品
router.get('/getOperatedShopsList', async (req, res, next) => {
  const { email, type } = req.query
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
    userPublishList,
    userCollectList,
    userCommentList,
    userLikeList
  } = user;
  let utralIdList;
  if(type === 'userPublish') {
    utralIdList = userPublishList.map(item => Types.ObjectId(item));
  } else if(type === 'userCollect') {
    utralIdList = userCollectList.map(item => Types.ObjectId(item));
  } else if(type === 'userComment') {
    utralIdList = userCommentList.map(item => Types.ObjectId(item));
  } else {
    utralIdList = userLikeList.map(item => Types.ObjectId(item));
  }
  const shopList = await Shop.find(
    {_id: {$in: utralIdList}}
  )
  const data = await promisesWrap(shopList, getShopUserInfo);
  res.send({
    code: 200,
    message: '获取用户操作的商品列表成功',
    data
  })
})

//获取用户关注的用户以及粉丝
router.get('/getOperatedUserList', async (req, res, next) => {
  const { email, type } = req.query
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
    userBeSubscribed,
    userSubscribe
  } = user;
  let ultralIdList = 
    type === 'userSubscribe' 
    ? userSubscribe
    : userBeSubscribed;
  const users = await User.find(
    {userEmail: {$in: ultralIdList}}
  )
  res.send(
    {
      code: 200,
      message: '获取用户操作的的用户成功',
      data: users
    }
  )
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

router.post('/subscribe', async (req,res,next) => {
  const { selfEmail, otherEmail } = req.body;
  if(!selfEmail || !otherEmail) {
    res.send({
      code: 500,
      message: '参数错误'
    })
    return;
  }
  //将别人Email加入自己的关注列表
  await User.updateOne(
    {userEmail: selfEmail},
    {$push: {userSubscribe: otherEmail}}
  )
  //将自己的Email加入别人的粉丝列表
  await User.updateOne(
    {userEmail: otherEmail},
    {$push: {userBeSubscribed: selfEmail}}
  )
  res.send({
    code: 200,
    message: '关注成功'
  })
})

router.post('/unSubscribe', async (req, res, next) => {
  const { selfEmail, otherEmail } = req.body;
  if(!selfEmail || !otherEmail) {
    res.send({
      code: 500,
      message: '参数错误'
    })
    return;
  }
  const self = await User.findOne({
    userEmail: selfEmail
  })
  const newUserSubscribe = self.userSubscribe.filter(item => item !== otherEmail) 
   //将别人Email从自己的关注列表移除
  await User.updateOne(
    {userEmail: selfEmail},
    {$set: {userSubscribe: newUserSubscribe}}
  )
  //将自己的email从他人的粉丝列表中移除
  const other = await User.findOne({
    userEmail: otherEmail
  })
  const newUserBeSubscribe = other.userBeSubscribed.filter(item => item !== selfEmail)
  await User.updateOne(
    {userEmail: otherEmail},
    {$set: {userBeSubscribed: newUserBeSubscribe}}
  )
  res.send({
    code: 200,
    message: '取消关注成功'
  })
})

//修改用户信息
router.post('/alterUser', async(req,res, next) => {
  const {
    userName,
    userGender,
    userAvatar,
    userStudentInfo,
    userIntroduce,
    userBirth,
    userAddress,
    userEmail
  } = req.body;
  if(!userEmail) {
    console.log(req.body)
    res.send({
      code: 500,
      message: '参数错误'
    });
    return;
  }
  const user = await User.findOne(
    {userEmail: userEmail}
  )
  const newName = userName ? userName : user.userName;
  const newGender = userGender ? userGender : user.userGender;
  const newAvatar = userAvatar ? userAvatar : user.userAvatar;
  const newStudentInfo = userStudentInfo ? userStudentInfo : user.userStudentInfo;
  const newIntroduce = userIntroduce ? userIntroduce : user.userIntroduce;
  const newBirth = userBirth ? userBirth : user.userBirth;
  const newAddress = userAddress ? userAddress : user.userAddress;
  await User.updateOne(
    {userEmail: userEmail},
    {
      userName: newName,
      userGender: newGender,
      userAvatar: newAvatar,
      userStudentInfo: newStudentInfo,
      userIntroduce: newIntroduce,
      userBirth: newBirth,
      userAddress: newAddress,
    }
  )
  res.send({
    code: 200,
    message: '修改成功'
  })
})

//用户收到的点赞，收藏，评论，以及关注用户发布新商品等信息
router.get('/myShops', async(req, res, next)=>{
  const { email } = req.query;
  if(!email) {
    console.log(req.query)
    res.send({
      code: 500,
      message: '参数错误',
    })
    return;
  }
  const tempData = await Shop.find({
    shopOwnerEmail: email
  })
  const data = await promisesWrap(tempData, getShopUserInfo);
  res.send({ 
    code: 200,
    message: '获取成功',
    data
  })
})

module.exports = router;