import React, { useEffect, useState } from "react";
import s from './style.module.less';
import { 
  Avatar, 
  ImageViewer,
  Image,
  Toast
} from 'antd-mobile';
import classnames from "classnames";
import {
  LikeOutline, 
  StarOutline,
  MessageOutline,
} from 'antd-mobile-icons';
import { Shop } from '../../utils/interface';
import { 
  UserCancelLike, 
  UserLike,
  UserCollect,
  UserCancelCollect
} from "../../api/effect";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { updateShopDetail } from "../../store/modules/shopDetail";
import { useNavigate } from "react-router-dom";

//TODO: 不能重复点赞以及点赞的状态保持;收藏同样如此

const Card:React.FC<Shop> = (props) => {
  const { 
    userAvatar = '',
    userName = '',
    userStudentInfo = '',
    shopTitle = '',
    shopPrice = 0,
    shopDescription = '',
    shopImgs = [],
    ShopComment = [],
    shopCollect = [],
    shopLike = [],
    shopId
  } = props || {};
  const userInfo = useAppSelector(state => state.user)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLike, setIsLike] = useState(false);
  const [likeCnt, setLikeCnt] = useState(0);
  const [isCollected, setIsCollected] = useState(false);
  const [collectCnt, setCollectCnt] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if(userInfo.userEmail && shopCollect && shopLike) {
      setLikeCnt(shopCollect.length);
      setCollectCnt(shopCollect.length);

      const likeIdx = shopLike.findIndex(item => item.email === userInfo.userEmail)
      if(likeIdx < 0) {
        setIsLike(false)
      } else {
        setIsLike(true)
      }
      const collectIdx = shopCollect.findIndex(item => item.email === userInfo.userEmail)
      if(collectIdx < 0) {
        setIsCollected(false)
      } else {
        setIsCollected(true)
      }
    }
  },[userInfo.userEmail, shopCollect, shopLike])

  const handleCardClick = () => {
    dispatch(updateShopDetail(props))
    navigate('/shopDetail')
  }

  const onClickLike = (e) => {
    e.stopPropagation()
    if(isLike) {
      (async () => {
        const res = await UserCancelLike({
          email: userInfo.userEmail,
          shopId
        })
        //结构请求之后，数据库数据已经改变，但是这边没有重新请求（也没必要），所以在本地改变
        const {
          code,
          message
        } = res
        if(code === 200) {
          setLikeCnt(likeCnt-1)
        } else {
          Toast.show(message)
        }
      })()
    } else {
      (async () => {
        const res = await UserLike({
          email: userInfo.userEmail,
          name: userInfo.userName,
          shopId
        })
        const {
          code,
          message
        } = res
        if(code === 200) {
          setLikeCnt(likeCnt+1)
        } else {
          Toast.show(message)
        }
      })()
    }
    setIsLike(!isLike)
  }
  const onClickCollect = (e) => {
    e.stopPropagation()
    if(isCollected) {
      (async () => {
        const res = await UserCancelCollect({
          email: userInfo.userEmail,
          shopId
        })
        //结构请求之后，数据库数据已经改变，但是这边没有重新请求（也没必要），所以在本地改变
        const {
          code,
          message
        } = res
        if(code === 200) {
          setCollectCnt(collectCnt-1)
        } else {
          Toast.show(message)
        }
      })()
    } else {
      (async () => {
        const res = await UserCollect({
          email: userInfo.userEmail,
          name: userInfo.userName,
          shopId
        })
        const {
          code,
          message
        } = res
        if(code === 200) {
          setCollectCnt(collectCnt+1)
        } else {
          Toast.show(message)
        }
      })()
    }
    setIsCollected(!isCollected)
  }
  return (
    <div 
      className={s.card}
      onClick={handleCardClick}
    >
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
            shopImgs.map((url) => {
              return (
              <Image
                key={url}
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
            images={shopImgs}
          />
        </div>
      </div>
      <div className={s.footer}>
        <div className={classnames(s.opreator, {[s.active]: isLike})}>
          <div className={s.icon} onClick={onClickLike}><LikeOutline /></div>
          <div className={s.count}>{likeCnt}</div>
        </div>
        <div className={s.opreator}>
          <div className={s.icon}><MessageOutline /></div>
          <div className={s.count}>{ShopComment.length}</div>
        </div>
        <div className={classnames(s.opreator, {[s.active]: isCollected})}>
          <div className={s.icon} onClick={onClickCollect}><StarOutline /></div>
          <div className={s.count}>{collectCnt}</div>
        </div>
      </div>
    </div>
  )
}

export default Card;