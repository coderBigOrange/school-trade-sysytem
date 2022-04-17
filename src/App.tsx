import React, { useEffect } from 'react'
import {  BrowserRouter as Router} from 'react-router-dom'
import  './index.less';
import MyRoutes from './router';
import io from 'socket.io-client';
import { insertMessage } from "./store/modules/message";
import { useAppDispatch,useAppSelector } from './hooks';
import { SimpleMessage } from './utils/interface';


//TODO: 所有页面的loading状态
const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user)

  useEffect(() => {
    //TODO: 这里应该和登录逻辑相结合
    if(user.userEmail && dispatch) {
      const socket = io('http://localhost:8080');
      socket.connect()
      socket.on(`sendOver${user.userEmail}`,( data: SimpleMessage) => {
        console.log('senOver', data)
        const {
          recieverEmail,
          senderEmail,
          content,
          createTime
        } = data;
        try {
          dispatch(insertMessage({
            email: recieverEmail,
            message: { 
              recieverEmail,
              senderEmail,
              content,
              createTime
            }
          }))
        } catch(err) {
          console.log(err)
        }
      })
      socket.on(`recicveMess${user.userEmail}`, ( data: SimpleMessage) => {
        console.log('recieve', data)
        const {
          recieverEmail,
          senderEmail,
          content,
          createTime
        } = data;
        try {
          dispatch(insertMessage({
            email: senderEmail,
            message: {
              recieverEmail,
              senderEmail,
              content,
              createTime
            }
          }))
        } catch(err) {
          console.log(err)
        }
      })
      window['socket'] = socket;
    }
  },[user.userEmail, dispatch])
  return (
    <Router>
      <MyRoutes />
    </Router>
  )
}


export default App
