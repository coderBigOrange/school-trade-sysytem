const e = require("express");
const { User } = require("../model/User");

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

module.exports = {
  getShopUserInfo,
  promisesWrap
}