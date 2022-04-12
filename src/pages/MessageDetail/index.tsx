import React  from "react";
import s from './style.module.less';
import { useNavigate} from 'react-router-dom';
import {
  NavBar,
  TextArea,
  Button
} from 'antd-mobile';
import debounce from 'lodash/debounce'
import SingleMessage from "./SingleMessage";

const MessageDetail:React.FC = () => {
  const navigate = useNavigate();

  const handleInput = (value: string) => {
    console.log(value)
  }
  const sendMessage = () => {
    console.log('发送')
  }
  return (
    <div className={s.messageDetail}>
      <NavBar 
        onBack={() => {navigate('/message')}}
      >
        马斯克
      </NavBar>
      <div className={s.body}>
        <SingleMessage 
          userAvatar="https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
          content="你好"
          isSend={false}
        />
      </div>
      <div className={s.footer}>
        <div className={s.input}>
          <TextArea 
            autoSize={{minRows: 1, maxRows: 5}}
            rows={1}
            onChange={debounce(handleInput, 200)}
            maxLength={150}
            style={{
              padding: 5,
              paddingTop: 7,
              '--disabled-color': "18px",
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