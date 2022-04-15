import React, { useEffect, useRef } from 'react';
import s from './style.module.less';
import { Avatar, SpinLoading } from 'antd-mobile';

type SingleMessageProps = {
  content: string;
  userAvatar: string;
  isSelf: boolean;
  isLastOne: boolean;
}

const SingleMessage: React.FC<SingleMessageProps> = (props) => {
  const {
    content,
    userAvatar,
    isSelf,
    isLastOne
  } = props || {};

  const ref = useRef(null);
  useEffect(() => {
    if(isLastOne && ref.current) {
      (ref.current as any).scrollIntoView({behavior: "smooth"});
    }
  },[isLastOne, ref])

  return (
    <div 
      ref={ref}
      className={s.message}
      style={{flexDirection: isSelf ? 'unset' : 'row-reverse'}}
    >
      {/* {
        TODO: 发消息的loading状态，暂时隐去
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
      } */}
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