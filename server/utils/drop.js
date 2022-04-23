const { User } = require('../model/User')
const { Shop } = require('../model/Shop');
const { Message } = require('../model/Message');
const { default: mongoose } = require('mongoose');

console.log('执行')
/**
 * 删除Message model
 */
// Message.remove({}, function(err) {
//   if(err) {
//     console.log(err);
//   }
//   console.log('删除所有消息成功')
// })

/**
 * 删除 Shop model
 */
// Shop.remove({}, function(err) {
//   if(err) {
//     console.log(err);
//   }
//   console.log('删除所有商品成功')
// })

/**
 * 删除 User Model
 */
// User.remove({}, function(err) {
//   if(err) {
//     console.log(err);
//   }
//   console.log('删除所有商品成功')
// })



/**
 * 清空消息
 * 首先删除Message下的所有消息
 * 之后清楚所有用户存储的消息
 */
// Message.deleteMany({}, function(err, res) {
//   if(err) {
//     console.log(err)
//   } else {
//     console.log('清空消息库',res)
//   }
// })

// User.updateMany({}, {
//   $set: {userMessageList: [], messageList: []}
// }, function(err,res) {
//   if(err) {
//     console.log(err)
//   } else {
//     console.log('清空所有用户存储的消息相关信息',res)
//   }
// })

/**
 * 删除商品
 * 首先删除Shop下的所有商品
 * 之后删除用户发布的商品
 * 之后删除用户发出和收到的点赞，收藏，评论
 */
// Shop.deleteMany({},function (err, res) {
//   if(err) {
//     console.log(err)
//   } else {
//     console.log('清除商品',res)
//   }
// })
// User.updateMany({}, {
//   $set: {userPublishList: []}
// }, function(err,res) {
//   if(err) {
//     console.log(err)
//   } else {
//     console.log('清楚所有用户发布的商品',res)
//   }
// })


/**
 * 用户相关
 */
// User.deleteMany({
//   $or: [
//     {userName: '测试1'},
//     {userName: '测试2'}
//   ]
// },function (err,res) {
//   if(err) {
//     console.log(err)
//   } else {
//     console.log('删除用户', res)
//   }
// })
