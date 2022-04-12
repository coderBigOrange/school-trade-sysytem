import { 
  SwipeAction
} from 'antd-mobile'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import s from './style.module.less';

type Message = {
  avatar: string;
  name: string;
  messageBrief: string;
  time?: Number;
}

const MessageList: React.FC<{data: Message[]}> = (props) => {
  const { data = [] } = props;
  return (
    <>
      {
        data.map((user,index) => {
          return (
            <SwipeAction
              key={user.name}
              rightActions={[
                {
                  key: 'pin',
                  text: '置顶',
                  color: 'primary',
                },
                {
                  key: 'delete',
                  text: '删除',
                  color: 'danger',
                },
              ]}
            >
              <MessageCard {...user}  />
            </SwipeAction>
        )})
      }
    </>
  )
}

const MessageCard: React.FC<Message> = (props) => {
  const {
    name,
    avatar,
    messageBrief,
  } = props;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/message/detail')
  }
  return (
    <div 
      className={s.card}
      onClick={handleClick}
    >
      <div className={s.avatar}>
        <img src={avatar} alt="头像" />
      </div>
      <div className={s.content}>
        <div className={s.name}>{name}</div>
        <div className={s.message}>{messageBrief}</div>
      </div>
      <div className={s.time}>2020-12-31</div>
    </div>
  )
}

export default MessageList;
