const { Schema } = require('../db/mongodb')
const mongoose = require('../db/mongodb')

const ShopSchema = new mongoose.Schema({
  shopTitle: {
    type: String,
  },
  shopDescription: {
    type: String
  },
  shopPrice: Number,
  shopSort: {
    type: Number
  },
  shopImg: {
    type: [String]
  },
  shopLikeCnt: {
    type: Number
  },
  shopCommentCnt: {
    type: Number
  },
  shopCollectCnt: {
    type: Number
  },
  // 商品和用户之间联系的纽带
  shopOwnerEmail: {
    type: String
  },
  //商品的评论
  shopComments: {
    type: [Schema.Types.ObjectId]
  }
})

const Shop = mongoose.model('Shop', ShopSchema)
module.exports = { Shop }