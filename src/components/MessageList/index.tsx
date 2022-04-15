import { 
  SwipeAction
} from 'antd-mobile'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import s from './style.module.less';
import { MessageType } from '../../utils/interface'; 
import { formatDate } from '../../utils';

const MessageList: React.FC<{data: MessageType[]}> = (props) => {
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

const MessageCard: React.FC<MessageType> = (props) => {
  const {
    name,
    avatar,
    content,
    createTime,
    email
  } = props;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/message/detail/${name}/${encodeURIComponent(avatar)}/${email}`)
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
        <div className={s.message}>{content}</div>
      </div>
      <div className={s.time}>{formatDate(createTime)}</div>
    </div>
  )
}

export default MessageList;
