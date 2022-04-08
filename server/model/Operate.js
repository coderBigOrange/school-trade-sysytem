const { Schema } = require('../db/mongodb')
const mongoose = require('../db/mongodb')
//基本操作：点赞，评论和收藏
const operateSchema = new mongoose.Schema({
  createTime: {
		type: Date,
		default: Date.now
	},
  opreateType: {
    type: Number
  },
  content: {  
    type: String //TODO: 可能需要考虑表情的情况
  },
  //操作和用户之间联系的纽带
  opratePublisherEmail: {
    type: String
  },
  operateRecieverEmail: {
    type: String
  },
  //评论和商品的纽带
  operateShopId: {
    type: Schema.Types.ObjectId,
  },
})

const Like = mongoose.model('Like', operateSchema)
const Comment = mongoose.model('Comment', operateSchema)
const Collection = mongoose.model('Collection', operateSchema)

module.exports = { 
  Like,
  Collection,
  Comment
}