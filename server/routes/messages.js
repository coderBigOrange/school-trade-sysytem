//TODOfind是否是异步，是 solved
var express = require('express');
var router = express.Router();
const { Message } = require('../model/Message')
//获取两个用户之间的消息
router.get('/messages', async(req, res, next) => {
  const { selfEmail, otherEmail } = req.query;
  const messages = await Message.find(
    {$or: [
      {
        senderEmail: selfEmail,
        recieverEmail: otherEmail
      }, {
        senderEmail: otherEmail,
        recieverEmail: selfEmail,
      }
    ]}
  )
  res.send({
    code: 200,
    messages: '获取消息成功',
    data:messages
  })
})

//获取所有消息
router.get('/allMessages', async(req, res, next)=>{
  const shopList = await Message.find({})
  res.send({ 
    code: 200,
    message: '获取成功',
    data: shopList
  })
})

module.exports = router;