const { User } = require("../model/User");
const { Message } = require("../model/Message")
const qiniu = require('qiniu')
//TODO: 提个问题，实现数组遍历promise，串行执行
const getShopUserInfo = async (shop) => {
  const { 
    shopOwnerEmail,
    shopTitle,
    shopDescription,
    shopPrice,
    shopSort,
    shopImg,
    shopLikeCnt,
    shopCommentCnt,
    shopCollectCnt
  } = shop;
  return User.findOne({
    userEmail: shopOwnerEmail
  }).exec().then(function (res) {
    const {
      userAvatar,
      userName,
      userStudentInfo
    } = res;
    return({
      shopOwnerEmail,
      shopTitle,
      shopDescription,
      shopPrice,
      shopSort,
      shopImg,
      shopLikeCnt,
      shopCommentCnt,
      shopCollectCnt,
      userAvatar,
      userName,
      userStudentInfo
    })
  })
}
//拿到message对应的信息
const getMessageInfo = async (messageId) => {
  return Message.findOne({
    _id: messageId 
  }).exec().then(message => {
    const { 
      senderEmail,
      recieverEmail,
      content,
      createTime
    } = message;

    return User.find({
      $or: [
        {userEmail: senderEmail},
        {userEmail: recieverEmail}
      ]
    }).exec().then(users => {
      return users.map(user => {
        const {
          userName,
          userAvatar,
          userEmail
        } = user
        return {  
          content,
          createTime,
          userName,
          userAvatar,
          userEmail
        }
      })
    })
  })
}
//对多个异步操作使用Promiseall封装
const promisesWrap = (dataSouce, asycnFn) => {
  if(!dataSouce || dataSouce.length < 1) {
    return;
  }
  const promiseArr = [];
  for(const item of dataSouce) {
    promiseArr.push(asycnFn(item))
  }
  return Promise.all(promiseArr).then((res) => {
    return res
  }).catch(err => {
    console.log(err)
  })
}

const getQiNiuToken = () => {
  // 创建上传凭证
const accessKey = '69m1NUcY37kSmSLT1GjeGUnl02T_yFJEyD8ojoqC'
const secretKey = 'SnE27ZqaSySKzD31M6fAuvg2DtgofYQNt_fhO_Ry'
// 鉴权对象 mac
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
const options = {
  scope: 'orange-imgs',
  expires: 7200
}
const putPolicy = new qiniu.rs.PutPolicy(options)
const uploadToken = putPolicy.uploadToken(mac)
return uploadToken;
}



module.exports = {
  getShopUserInfo,
  promisesWrap,
  getQiNiuToken,
  getMessageInfo
}