import React, { useState } from "react";
import s from './style.module.less';
import { Avatar, } from 'antd-mobile';
import classnames from "classnames";
import {
  LikeOutline, 
  StarOutline,
  MessageOutline,
} from 'antd-mobile-icons';
const Card = () => {
  const [isLike, setIsLike] = useState(false);
  const [isCollected, setIsCollected] = useState(false);
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
          <Avatar src="https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"/>
        </div>
        <div className={s.baseInfo}>
          <div className={s.userName}>埃隆马斯克</div>
          <div className={s.otherInfo}>机电学院计算机2班</div>
        </div>
      </div>
      <div className={s.content}>
        <div className={s.title}>美旅拉杆箱 行李箱男女万向轮旅行箱商务箱包登机密码箱  20英寸 银色 BJ9</div>
        <div className={s.shopBrief}>世纪东方六点十分酷酷酷酷酷酷酷酷酷酷酷上岛咖啡看了你的你速度快v哦看到了是v，六大门派上课的产品v速度快v没可能店里看没付款的口感纳斯达克麻烦了肯定是</div>
        <div className={s.shopImg}>
          <img src="https://img10.360buyimg.com/mobilecms/s360x360_jfs/t1/117838/28/22055/206224/62441662E46016aa1/38e4645463def9ed.jpg!q70.dpg.webp" alt="" />
        </div>
        <div className={s.saleInfo}>
          <div className={s.price}>99.8</div>
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