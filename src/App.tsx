import React, { useEffect } from 'react'
import {  BrowserRouter as Router} from 'react-router-dom'
import  './index.less';
import MyRoutes from './router';
import io from 'socket.io-client';
import { insertMessage } from "./store/modules/message";
import { useAppDispatch,useAppSelector } from './store/hooks';


//TODO: 所有页面的loading状态
const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const avatar = useAppSelector(state => state.user.avatar)

  useEffect(() => {
    //TODO: 这里其实存在bug，应该和登录逻辑相结合
    const socket = io('http://localhost:8080');
    socket.connect()
    socket.on(`recicveMess${socket.id}`, data => {
      console.log(data)
    })
    socket.on(`sendOver${'1810410221@student.cumtb.edu.cn'}`, data => {
      console.log('senOver')
      dispatch(insertMessage({
        ...data,
        avatar,
      }))
    })
    window['socket'] = socket;
  },[])
  return (
    <Router>
      <MyRoutes />
    </Router>
  )
}


export default App
