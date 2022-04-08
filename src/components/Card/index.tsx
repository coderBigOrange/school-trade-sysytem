import React, { useState } from "react";
import s from './style.module.less';
import { 
  Avatar, 
  ImageViewer,
  Image
} from 'antd-mobile';
import classnames from "classnames";
import {
  LikeOutline, 
  StarOutline,
  MessageOutline,
} from 'antd-mobile-icons';

type CartProps = {
  userAvatar: string;
  userName: string;
  userStudentInfo: string;
  shopTitle: string;
  shopPrice: number;
  shopDescription: string;
  shopImg: string[];
}

const Card:React.FC<CartProps> = (props) => {
  const { 
    userAvatar = '',
    userName = '',
    userStudentInfo = '',
    shopTitle = '',
    shopPrice = 0,
    shopDescription = '',
    shopImg = []
  } = props || {};
  const [isLike, setIsLike] = useState(false);
  const [isCollected, setIsCollected] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const onClickLike = () => {
    setIsLike(!isLike)
  }
  const onClickCollect = () => {
    setIsCollected(!isCollected)
  }
  return (
    <div className={s.card}>
      <div className={s.header}>
        <div className={s.avatar}>
          <Avatar src={userAvatar}/>
        </div>
        <div className={s.baseInfo}>
          <div className={s.userName}>{userName}</div>
          <div className={s.otherInfo}>{userStudentInfo}</div>
        </div>
      </div>
      <div className={s.content}>
        <div className={s.title}>
          <span className={s.price}>{shopPrice}</span>
          {shopTitle}
        </div>
        <div className={s.shopBrief}>{shopDescription}</div>
        <div className={s.shopImg}>
          {
            shopImg.map((url, index) => {
              return (
              <Image
                key={index}
                src={url}
                lazy={true}
                width={160} 
                height={160} 
                fit="cover"
                style={{ borderRadius: 8, marginRight: 8, marginBottom: 8 }}
              />
              )
            })
          }
          <ImageViewer.Multi
            visible={isVisible}
            onClose={() => setIsVisible(false)}
            defaultIndex={0}
            images={shopImg}
          />
        </div>
      </div>
      <div className={s.footer}>
        <div className={classnames(s.opreator, {[s.active]: isLike})}>
          <div className={s.icon} onClick={onClickLike}><LikeOutline /></div>
          <div className={s.count}>998</div>
        </div>
        <div className={s.opreator}>
          <div className={s.icon}><MessageOutline /></div>
          <div className={s.count}>298</div>
        </div>
        <div className={classnames(s.opreator, {[s.active]: isCollected})}>
          <div className={s.icon} onClick={onClickCollect}><StarOutline /></div>
          <div className={s.count}>180</div>
        </div>
      </div>
    </div>
  )
}

export default Card;