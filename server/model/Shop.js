const { Schema } = require('../db/mongodb')
const mongoose = require('../db/mongodb')

const ShopSchema = new mongoose.Schema({
  shopTitle: String,
  shopDescription: String,
  shopPrice: Number,
  shopSort: String,
  shopOwnerEmail: String,
  shopImgs: [String],
  createTime: {
    type: Date,
    default: Date.now
  },
  ShopComment: [
    { 
      content: String, //评论者的头像内容等信息
      email: String,
      name: String,
			createTime: {
				type: Date,
				default: Date.now
			},
    }
  ],
  shopLike: [
    {
      email: String, //点赞者的头像等信息
      name: String,
			createTime: {
				type: Date,
				default: Date.now
			},
    }
  ],
  shopCollect: [
    {
      email: String, //收藏者的头像等信息
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