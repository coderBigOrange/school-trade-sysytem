//TODOfind是否是异步，是 solved
var express = require('express');
var router = express.Router();
const { User } = require('../model/User')
const { Shop } = require('../model/Shop');
const { Message } = require('../model/Message');
const { getShopUserInfo, promisesWrap } = require('../utils');
const { Types } = require('../db/mongodb');


//获取商品列表 
//目前已知Mongodb返回的内容是插入顺序排序的
router.get('/shopList', async(req, res, next)=>{
  const {
    shopSort,
    page,
    email
  } = req.query;
  if(!shopSort || !page) {
    console.log(req.query)
    res.send({
      code: 500,
      message: '参数错误',
    })
    return;
  }
  let shopList;
  if(shopSort === 'recommend') {
    shopList = await Shop.find({})
  } else if(shopSort === 'care') {
    if(!email) {
      res.send({
        code: 401,
        message: '抱歉，需要登录后查看',
      })
      return
    }
    const user = await User.findOne({
      userEmail: email
    })
    shopList = await Shop.find(
      {shopOwnerEmail: {$in: user.userSubscribe}}
    )
  }else {
    shopList = await Shop.find({
      shopSort
    })
  }
  const start = page*5;
  const end = page*5 + 5;
  let tempData = shopList.slice(start, end)
  const data = await promisesWrap(tempData, getShopUserInfo);
  res.send({ 
    code: 200,
    message: '获取成功',
    data
  })
})


//获取全部商品
router.get('/allShops', async(req,res,next) => {
  const shopList = await Shop.find({});
  res.send({
    code: 200,
    message: '获取成功',
    data: shopList
  })
})

//修改测试域名的接口
router.get('/alert', async(req, res, next) => {
  const shopList = await Shop.find({});
  const userList = await User.find({});
  // shopList.forEach((item) => {
  //   const id = Types.ObjectId(item._id);
  //   const newShopImgs = [item.shopImgs[0].replace('rbcv05x6c.hb-bkt.clouddn.com','rcxkuaehe.hb-bkt.clouddn.com')];
  //   Shop.updateOne(
  //     {_id: id},
  //     {
  //       $set: {shopImgs: newShopImgs}
  //     },
  //     function(err, res) {
  //       console.log(res)
  //     }
  //   )
  // })
  // userList.forEach(item => {
  //   const id = Types.ObjectId(item._id);
  //   const newAvatar = item.userAvatar.replace('rbcv05x6c.hb-bkt.clouddn.com','rcxkuaehe.hb-bkt.clouddn.com')
  //   const newMessgaeList = item.messageList.map(messageItem => {
  //     messageItem.avatar = messageItem.avatar.replace('rbcv05x6c.hb-bkt.clouddn.com','rcxkuaehe.hb-bkt.clouddn.com')
  //     return messageItem
  //   })
  //   User.updateOne(
  //     {_id: id},
  //     {
  //       $set: {
  //         userAvatar: newAvatar,
  //         messageList: newMessgaeList
  //       }
  //     },
  //     function(err, res) {
  //       console.log(res)
  //     }
  //   )
  // })
})

//搜索
router.get('/search', async (req,res,next) => {
  const { type, value } = req.query; 
  if(type === 'user') {
    const users =  await User.find(
      {$or: [
        {userEmail: eval('/'+value+'/i')},
        {userName:  eval('/'+value+'/i')},
        {userStudentInfo:  eval('/'+value+'/i')}
      ]}
    )
    res.send({
      code: 200,
      message: '搜索用户成功',
      data: users
    })
  } else {
    const shops = await Shop.find(
      {$or: [
        {shopTitle:  eval('/'+value+'/i')},
        {shopDescription:   eval('/'+value+'/i')}
      ]}
    )
  const data = await promisesWrap(shops, getShopUserInfo);
    res.send({
      code: 200,
      message: '搜索商品成功',
      data: data
    })
  }   
})

module.exports = router;