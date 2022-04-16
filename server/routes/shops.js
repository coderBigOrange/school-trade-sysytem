//TODOfind是否是异步，是 solved
var express = require('express');
var router = express.Router();
const { User } = require('../model/User')
const { Shop } = require('../model/Shop');
const { getShopUserInfo, promisesWrap } = require('../utils');


//获取商品列表
router.get('/shopList', async(req, res, next)=>{
  const {
    shopSort,
    page,
  } = req.query
  const shopList = await Shop.find({
    shopSort
  })
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
  res.send({
    code: 200,
    message: '发布成功',
    data: shop
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

module.exports = router;