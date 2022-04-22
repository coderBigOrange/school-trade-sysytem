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
    shopImgs,
    shopLike,
    ShopComment,
    shopCollect,
    _id,
    createTime,
    shopState
  } = shop;
  return User.findOne({
    userEmail: shopOwnerEmail
  }).exec().then(function (res) {
    const {
      userAvatar,
      userName,
      userStudentInfo
    } = res;
    const likeUserInfo = promisesWrap(shopLike, getLiketUserInfo)
    const commentUserInfo = promisesWrap(ShopComment, getCommentUserInfo)
    return Promise.all([
      likeUserInfo,
      commentUserInfo,
      userAvatar,
      userName,
      userStudentInfo
    ])

  }).then(res => {
    const [
      likeUserInfo, 
      commentUserInfo,
      userAvatar,
      userName,
      userStudentInfo
    ] = res;
    return({
      shopOwnerEmail,
      shopTitle,
      shopDescription,
      shopPrice,
      shopSort,
      shopImgs,
      shopLike: likeUserInfo,
      ShopComment: commentUserInfo,
      shopCollect,
      userAvatar,
      userName,
      userStudentInfo,
      shopId: _id,
      createTime,
      shopState
    })
  }) 
}

//拿到评论的用户信息
const getCommentUserInfo = (comment) => {
  const {
    content,
    email,
    createTime
  } = comment;
  return User.findOne({
    userEmail: email
  }).exec().then(res => {
    const {
      userAvatar,
      userName,
    } = res;
    return {
      content,
      email,
      createTime,
      avatar: userAvatar,
      name: userName
    }
  })
}

//拿到点赞者的用户信息
const getLiketUserInfo = (data) => {
  const {
    email,
    createTime
  } = data;
  return User.findOne({
    userEmail: email
  }).exec().then(res => {
    const {
      userAvatar,
      userName,
    } = res;
    return {
      email,
      createTime,
      avatar: userAvatar,
      name: userName
    }
  })
}

//拿到message对应的信息
const getMessageInfo = async (messageId) => {
  return Message.findOne({
    _id: messageId 
  }).exec().then(message => {
    const { 
      selfEmail,
      otherEmail,
      content,
      createTime
    } = message;

    return User.find({
      $or: [
        {userEmail: selfEmail},
        {userEmail: otherEmail}
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
    return [];
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

//更新消息列表，消息列表只展示最新的一条消息
const updateMessageList = async (self,other, content) => {
  let selfMessageList = self.messageList;
  const {
    userEmail,
    userAvatar,
    userName
  } = other;
  if(selfMessageList && selfMessageList.length) {
    selfMessageList.forEach(item => {
      if(item.email === userEmail) {
        item.content = content;
        item.avatar = userAvatar
        item.name = userName
        item.createTime = new Date();
      }
    })
  } else {
    selfMessageList = [{
      email: userEmail,
			content: content,
			avatar: userAvatar,
			name: userName,
    }]
  }
  await User.updateOne(
    {userEmail: self.userEmail},
    {$set: {messageList: selfMessageList}}
  )
}



module.exports = {
  getShopUserInfo,
  promisesWrap,
  getQiNiuToken,
  getMessageInfo,
  updateMessageList,
  getLiketUserInfo,
  getCommentUserInfo
}