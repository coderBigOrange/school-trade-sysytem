const { Message } = require('../model/Message')
const { User } = require('../model/User')
const { updateMessageList } = require('.')

const socketCallBack = (socket)=> {
  console.log('一位用户连接', socket.id)
  socket.on('chat', async(messageObj) => {
    const {
      recieverEmail,
      senderEmail,
      content
    } = messageObj;
    const res = await Message.create(messageObj)
    const sender = await User.findOne({
      userEmail: senderEmail
    })
    const reciever = await User.findOne({
      userEmail: recieverEmail
    })
    await updateMessageList(sender, reciever, content);
    await updateMessageList(reciever, sender, content);
    await User.updateMany(
      {$or: [
        {userEmail: recieverEmail},
        {userEmail: senderEmail}
      ]},
      {$push: {userMessageList: res._id}}
    )
    socket.emit(`sendOver${senderEmail}`,res)
    socket.emit(`recicveMess${recieverEmail}`,res)
  })
}

module.exports= socketCallBack;