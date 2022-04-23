// 引入mongodb
const mongoose = require('../db/mongodb')
const { Schema } = require('../db/mongodb')

const bcrypt = require('bcrypt')
// 建立用户表
const UserSchema = new mongoose.Schema({
	userName: String,
	userEmail: {
		type: String,
		unique: true
	},
	password: {
		type: String,
		set(val){
			return bcrypt.hashSync(val, 10)//用于加密
		},
		select: false
	},
	userAvatar: String,
	userGender: {
		type: Number,
		min: 1,
		max: 2
	},
	userStudentInfo: String,
	userIntroduce: {
		type: String,
		default: '这个人很懒喔，连自我介绍都没有~'
	},
	userAddress: String,
	userBirth: {
		type: Date,
		default: Date.now
	},
	createTime: {
		type: Date,
		default: Date.now
	},
	userMessageList: [Schema.Types.ObjectId], //存储与用户相关的所有消息ID
	userPublishList: [Schema.Types.ObjectId],//用户发布的商品的id
	userBeSubscribed: [String],//关注用户的人的邮箱
	userSubscribe: [String],//用户关注的人的邮箱
	userLikeList: [Schema.Types.ObjectId],//用户点赞的商品id
	userCollectList: [Schema.Types.ObjectId],//用户收藏的商品id
	userCommentList: [Schema.Types.ObjectId],//用户评论的商品id
	userVisitedList: [Schema.Types.ObjectId],//用户访问过的商品的id
	messageList: [ //存储该用户消息列表展示的消息（时间最近一条）
		{
			email: String,
			content: String,
			avatar: String,
			name: String,
			createTime: {
				type: Date,
				default: Date.now
			},
		}
	]
})

// 建立用户数据库模型
const User = mongoose.model('User', UserSchema)
module.exports = { User }