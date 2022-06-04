import { 
  SwipeAction
} from 'antd-mobile'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import s from './style.module.less';
import { MessageType } from '../../utils/interface';
import { PinMessageItem, DeleteMessageItem } from '../../api/effect';
import { useAppSelector, useAppDispatch} from "../../hooks";
import { formatDate } from '../../utils';

const MessageList: React.FC<{
  data: MessageType[],
  refresh: React.Dispatch<React.SetStateAction<boolean>>
}> = (props) => {
  const { data = [], refresh } = props;
  const self = useAppSelector(state => state.user)
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
                  onClick: async () => {
                    const res = await PinMessageItem({selfEmail: self.userEmail, otherEmail: user.email})
                    if(res.code === 200) {
                      refresh(value => !value)
                    }
                  }
                },
                
                {
                  key: 'delete',
                  text: '删除',
                  color: 'danger',
                  onClick: async () => {
                    const res = await DeleteMessageItem({selfEmail: self.userEmail, otherEmail: user.email})
                    if(res.code === 200) {
                      refresh(value => !value)
                    }
                  }
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
