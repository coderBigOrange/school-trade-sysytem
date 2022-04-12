const { Schema } = require('../db/mongodb')
const mongoose = require('../db/mongodb')

const MessageSchema = new mongoose.Schema({
  createTime: {
		type: Date,
		default: Date.now
	},
  senderEmail: String,
  recieverEmail: String,
  content: String //TODO: 展示先以纯文本为消息内容
})

const Message = mongoose.model('Message', MessageSchema)

module.exports = { Message }