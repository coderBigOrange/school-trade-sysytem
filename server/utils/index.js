const { User } = require("../model/User");
const qiniu = require('qiniu')

const getShopUserInfo = async (shop) => {
  return new Promise((resolve, reject) => {
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
    User.findOne({
      userEmail: shopOwnerEmail
    },function (err, res) {
      if(err) {
        reject(err)
      } else {
        const {
          userAvatar,
          userName,
          userStudentInfo
        } = res;
        resolve({
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
      }
    })
  })
}

const promisesWrap = (dataSouce, asycnFn) => {
  const promiseArr = [];
  for(const item of dataSouce) {
    promiseArr.push(asycnFn(item))
  }
  return Promise.all(promiseArr).then((res) => {
    return res
  }).catch(err => {
    console.log(err)
    return err
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
  getQiNiuToken
}