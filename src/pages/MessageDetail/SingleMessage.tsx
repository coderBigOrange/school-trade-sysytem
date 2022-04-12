import React from 'react';
import s from './style.module.less';
import { Avatar, SpinLoading } from 'antd-mobile';

type SingleMessageProps = {
  content: string;
  userAvatar: string;
  isSend: boolean;
}

const SingleMessage: React.FC<SingleMessageProps> = (props) => {
  const {
    content,
    userAvatar,
    isSend
  } = props || {};
  return (
    <div className={s.message}>
      {
        !isSend && (
          <div className={s.state}>
            <SpinLoading
              style={{
                '--size': '20px',
                '--color': 'red'
              }}
            />
          </div>
        )
      }
      <div className={s.content}>
        {content}
      </div>
      <div className={s.user}>
        <Avatar 
          src={userAvatar}
        />
      </div>
    </div>
  )
}

export default SingleMessage;