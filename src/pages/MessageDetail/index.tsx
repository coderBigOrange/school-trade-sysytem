import React, { useState, useRef, useEffect}  from "react";
import s from './style.module.less';
import { useNavigate, useParams } from 'react-router-dom';
import {
  NavBar,
  TextArea,
  Button,
  Toast
} from 'antd-mobile';
import debounce from 'lodash/debounce'
import SingleMessage from "./SingleMessage";
import { initailMessages } from "../../store/modules/message";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { SimpleMessage } from '../../utils/interface';
import { GetMessages } from '../../api/effect'

const MessageDetail:React.FC = () => {
  const [message, setMessage] = useState<string>('')
  const messRef = useRef(null);
  const navigate = useNavigate();
  const socket = window['socket'];
  // const [allMessages, setAllMessages] = useState<SimpleMessage[]>([])
  const params = useParams()
  const userInfo = useAppSelector(state => state.user)
  const dispatch = useAppDispatch();
  const allMessages = useAppSelector(state => state.message)
  const [curMessages, setCurMessages] = useState<SimpleMessage[]>([]);

  useEffect(() => {
    if(params.email && userInfo.email && dispatch) {
      (async () => {
        if(params.email) {
          const res = await GetMessages({
            selfEmail: userInfo.email,
            otherEmail: params.email
          })
          const {
            code,
            data,
            message
          } = res;
          if(code === 200) {
            dispatch(initailMessages({
              email: params.email,
              messages: data
            }))
          } else {
            Toast.show(message)
          }
        }
      })();
    }
  },[params.email, userInfo.email, dispatch])
  
  useEffect(() => {
    if(params.email && allMessages) {
      setCurMessages(allMessages[params.email] || [])
    }
  },[allMessages,params.email])


  const handleInput = (value: string) => {
    setMessage(value);
  }
  const sendMessage = () => {
    const tempMessage = message;
    socket.emit('chat', {
      content: tempMessage,
      senderEmail: userInfo.email,
      recieverEmail: params.email
    })
    setMessage('');
    (messRef.current as any).clear();
  }
  return (
    <div className={s.messageDetail}>
      <NavBar 
        onBack={() => {navigate('/message')}}
      >
        {params.name}
      </NavBar>
      <div className={s.body}>
        {
          curMessages.map((item, index) => {
            const {
              content,
              recieverEmail,
              senderEmail,
              createTime
            } = item;
            const isSelf = senderEmail === userInfo.email;
            const avatar = isSelf
              ? userInfo.avatar
              : params.avatar || '';
            return (
              <SingleMessage 
                key={index}
                userAvatar={avatar}
                content={content}
                isSelf={isSelf}
                isLastOne= {index === curMessages.length -1}
              />
            )
          })
        }
        
      </div>
      <div className={s.footer}>
        <div className={s.input}>
          <TextArea 
            ref={messRef}
            autoSize={{minRows: 1, maxRows: 5}}
            rows={1}
            onChange={debounce(handleInput, 200)}
            maxLength={150}
            style={{
              padding: 5,
              paddingTop: 7
            }}
          />
        </div>
        <div className={s.icon}></div>
        <div className={s.submit}>
          <Button 
            color="success"
            size="middle"
            onClick={sendMessage}
          >
            发送
          </Button>
        </div>
      </div>
    </div>
  )
}

export default MessageDetail;

//TODO: 在线通信大概实现模型 ： 利用socketIO（本质是websocket）全双工特性
/**
 * 模型原理
 * 
 * A发出消息
 * 服务器感知,并获取消息对象，做出相应操作比如存入数据库；服务器发出消息并带上消息对象
 * B感知服务器发送的消息，接受消息对象，做相应操作比如存入Store
 * 下次登录时通过接口请求上次的历史消息，进行消息复原
 * 
 * 可以看到实现关键之处在于客户端和服务端如何建立起联系
 */