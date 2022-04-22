const { Schema } = require('../db/mongodb')
const mongoose = require('../db/mongodb')

const ShopSchema = new mongoose.Schema({
  shopTitle: String,
  shopDescription: String,
  shopPrice: Number,
  shopSort: String,
  shopOwnerEmail: String,
  shopImgs: [String],
  shopState: {//商品的状态，上架或者下架
    type: Number,
    min: 1,//上架
    max: 2,//下架
    default: 1, 
  },
  createTime: {
    type: Date,
    default: Date.now
  },
  ShopComment: [
    { 
      content: String, //评论者的头像内容等信息
      email: String,
      avatar: String,
      likeCnt: {
        type: Number,
        default: 0
      },
      name: String,
			createTime: {
				type: Date,
				default: Date.now
			},
    }
  ],
  shopLike: [
    {
      email: String, //点赞者信息
      name: String,
			createTime: {
				type: Date,
				default: Date.now
			},
    }
  ],
  shopCollect: [
    {
      email: String, //收藏者信息
      name: String,
			createTime: {
				type: Date,
				default: Date.now
			},
    }
  ]
})

const Shop = mongoose.model('Shop', ShopSchema)
module.exports = { Shop }