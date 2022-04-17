const { User } = require('../model/User')
const { Shop } = require('../model/Shop');
const { Message } = require('../model/Message')

console.log('执行')

/**
 * 消息相关
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
 * 商品相关
 * 应该连带删除用户评价，点赞和收藏
 */
// Shop.deleteMany({},function (err, res) {
//   if(err) {
//     console.log(err)
//   } else {
//     console.log('清楚商品',res)
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
