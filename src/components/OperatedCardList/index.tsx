import React from "react";
import s from './style.module.less';
import { Shop, UserOperateType} from '../../utils/interface';
import { Avatar } from "antd-mobile";
import { useAppDispatch } from "../../hooks";
import { updateShopDetail } from "../../store/modules/shopDetail";
import { useNavigate } from "react-router-dom";
import {formatDate} from '../../utils';

type OperateCardProps = {
  userAvatar: string;
  userName: string;
  img: string;
  shopTitle: string;
  tipInfo: string;
  createTime: string;
  onClick: () => void;
  commentContent?: string;
}

type OperateCardListProps = {
  shopList: Shop[];
  type: UserOperateType;
}
const {
  USER_COMMENT,
  USER_LIKE,
  USER_BE_SUBSCRIBE,
  USER_PUBLISH
} = UserOperateType;

const OperatedCard: React.FC<OperateCardProps> = (props) => {
  const {
    userAvatar,
    userName,
    img,
    tipInfo,
    shopTitle,
    createTime,
    onClick,
    commentContent = ''
  } = props;

  return (
    <div className={s.card} onClick={() => onClick()}>
      <div className={s.top}>
        <div className={s.avatar}>
          <Avatar 
            style={{
              '--border-radius': '50%',
              '--size': '50px'
            }} 
            src={userAvatar}
          />
        </div>
        <div className={s.userInfo}>
          <div className={s.userName}>
            {userName}
            <span className={s.tip}>{tipInfo}</span>
          </div>
          <div className={s.operateTime}>{formatDate(createTime)}</div>
        </div>
        <div className={s.shopInfo}>
          <div className={s.shopName}>{shopTitle}</div>
          <Avatar 
            src={img}
            fit="cover"
            style={{
              '--size': '50px',
              'border': '1px solid e5e5e5'
            }}
            />
        </div>
      </div>
      <div className={s.content}>{commentContent}</div>
    </div>
  )
}

const OperateCardList: React.FC<OperateCardListProps> = (props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    shopList,
    type
  } = props;
  let data;
  if(type === USER_LIKE) {
    const tempData = shopList.map(shop => {  
      const { shopLike, shopImgs, shopTitle } = shop;
      const onClick = () => {
        dispatch(updateShopDetail(shop))
        navigate('/shopDetail')
      }
      return shopLike.map(like => {
        const {
          avatar,
          name,
          createTime
        } = like;
        return { 
          userAvatar: avatar,
          userName: name,
          createTime,
          shopTitle,
          img: shopImgs[0],
          tipInfo: '赞了您的',
          onClick
        } as OperateCardProps;
      })
    })
    data = tempData.reduce((pre, nex) => pre.concat(nex))
  }  else if (type === USER_COMMENT) {
    const tempData = shopList.map(shop => {  
      const { ShopComment, shopImgs,shopTitle } = shop;
      const onClick = () => {
        dispatch(updateShopDetail(shop))
        navigate('/shopDetail')
      }
      return ShopComment.map(like => {
        const {
          avatar,
          name,
          content,
          createTime
        } = like;
        return {
          userAvatar: avatar,
          userName: name,
          createTime,
          img: shopImgs[0],
          shopTitle,
          tipInfo: '评论了您',
          onClick,
          commentContent: content
        } as OperateCardProps
      })
    })
    data = tempData.reduce((pre, nex) => pre.concat(nex))
  } else if (type ===USER_PUBLISH) {
    data = shopList.map(shop => {  
      const { userAvatar,userName,createTime, shopImgs } = shop;
      const onClick = () => {
        dispatch(updateShopDetail(shop))
        navigate('/shopDetail')
      }
      return {
        userAvatar,
        userName,
        createTime,
        img: shopImgs[0],
        tipInfo: '发布了新商品',
        onClick,
      } as OperateCardProps
    })
  }
  console.log('最终data:',data,type)
  data = data || []
  return (
    <div className={s.list}>
      {
        data.map((item, index) => {
          return (
            <OperatedCard {...item}  key={index}/>
          )
        })
      }
    </div>
  )
}

export default OperateCardList;