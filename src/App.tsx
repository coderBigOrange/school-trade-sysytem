import React, { useEffect } from 'react'
import {  BrowserRouter as Router} from 'react-router-dom'
import  './index.less';
import MyRoutes from './router';
import io from 'socket.io-client'

//TODO: 所有页面的loading状态
const App: React.FC = () => {
  useEffect(() => {
    const socket = io('http://localhost:8080');
    socket.connect()
    socket.on('greet', () => {
      console.log('你好')
    })
  },[])
  return (
    <Router>
      <MyRoutes />
    </Router>
  )
}


export default App
