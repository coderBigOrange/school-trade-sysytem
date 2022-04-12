
const socketCallBack = (socket)=> {
  console.log('一位用户连接', socket.id)
  socket.emit('greet')
}

module.exports= socketCallBack;