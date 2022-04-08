const mongoose = require('../db/mongodb')

const SubScribeSchema = new mongoose.Schema({
  createTime: {
		type: Date,
		default: Date.now
	},
  //评论和用户之间联系的纽带
  subscribePublisherEmail: {
    type: String
  },
  subscribeRecieverEmail: {
    type: String
  },
})

const SubScribe = mongoose.model('Shop', SubScribeSchema)
module.exports = { SubScribe }