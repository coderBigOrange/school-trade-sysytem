/**
 * TODO: 区分自己发布的和他人发布的
 */
import React, { useRef, useState }  from "react";
import s from './style.module.less';
import {
  NavBar,
  Avatar,
  Image,
  Button,
  TextArea,
  Toast
} from 'antd-mobile';
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { formatDate } from "../../utils";
import debounce from 'lodash/debounce'
import { UserComment } from "../../api/effect";
import { insertShopComment } from "../../store/modules/shopDetail";


const ShopDetail: React.FC = () => {
  const navigate = useNavigate();
  const detailInfo = useAppSelector(state => state.shopDetail);
  const userInfo = useAppSelector(state => state.user);
  const messRef = useRef(null);
  const [commentVal, setCommentVal] = useState('');
  const dispatch = useAppDispatch();
  const {
    userAvatar,
    userName,
    userStudentInfo,
    shopTitle,
    shopDescription,
    shopPrice,
    shopImgs,
    shopSort,
    shopCollect,
    ShopComment,
    shopLike,
    shopId,
    shopOwnerEmail
  } = detailInfo;

  const onSubScribe = () => {
    console.log('subscibe')
  }
  const onclickAvatar = (email: string) => {
    console.log(email)
  }
  const onClickChat = () => {
    navigate(`/message/detail/${userName}/${encodeURIComponent(userAvatar)}/${shopOwnerEmail}`)
  }
  const onClickPublish = () => {
    navigate('/publish')
  }
  const sendComment = () => {
    console.log(commentVal);
    (async () => {
      const res =  await UserComment({
        content: commentVal,
        avatar: userInfo.userAvatar,
        name: userInfo.userName,
        shopId,
        email: userInfo.userEmail
      })
      const {
        code,
        message,
        data
      } = res;
      if(code === 200) {
        dispatch(insertShopComment(data))
      } else {
        Toast.show(message)
      }
    })();
    (messRef.current as any).clear();
  }
  const handleInput = (value: string) => {
    setCommentVal(value);
  }
  return (
    <div className={s.shopDetail}>
      <div className={s.header}>
        <NavBar onBack={() => navigate('/home')}>商品详情</NavBar>
        <div className={s.userInfo}>
          <div className={s.avatar}>
            <Avatar 
              style={{'--border-radius': '50%'}} 
              src={userAvatar}
              onClick={() => onclickAvatar(shopOwnerEmail)}
            />
          </div>
          <div className={s.baseInfo}>
            <div className={s.userName}>{userName}</div>
            <div className={s.otherInfo}>{userStudentInfo}</div>
          </div>
          <div 
            className={s.subscribe}
            onClick={onSubScribe}
          >
            +&nbsp;关注
          </div>
        </div>
      </div>
      <div className={s.body}>
        <div className={s.shopInfo}>
          <div className={s.price}>{shopPrice}</div>
          <div className={s.title}>{shopTitle}</div>
          <div className={s.content}>{shopDescription}</div>
          <div className={s.imgs}>
            {
              shopImgs.map(url => {
                return (
                  <Image
                    key={url}
                    src={url}
                    lazy={true}
                    fit="fill"
                    style={{ borderRadius: 8, marginRight: 8, marginBottom: 8 }}
                  />
                )
              })
            }
          </div>
        </div>
        {/* <div className={s.sort}>
          <div className={s.title}>商品分类</div>
          {shopSort}
        </div> */}
        <div className={s.commentOperate}>
          <div className={s.title}>留言</div>
            <div className={s.commentInput}>
              <div className={s.avatar}>
                <Avatar 
                  style={{
                    '--border-radius': '50%',
                    '--size': '33px'
                  }} 
                  src={userAvatar}
                  onClick={() => onclickAvatar(shopOwnerEmail)}
                />
              </div>
              <div className={s.input}>
                <TextArea 
                  ref={messRef}
                  onChange={debounce(handleInput, 200)}
                  placeholder="欢迎留下您宝贵的意见~"
                  autoSize={{minRows: 1, maxRows: 5}}
                  rows={1}
                  maxLength={150}
                  style={{
                    padding: 3,
                    paddingTop: 5,
                  }}
                />
              </div>
              <div className={s.submit}>
                <Button 
                  color="success"
                  size="small"
                  style={{
                    '--background-color': '#7871ff',
                    '--border-color': 'white',
                  }}
                  onClick={sendComment}
                >
                  发送
                </Button>
              </div>
            </div>
          </div>
        <div className={s.comment}>
          <div className={s.title}>评论</div>
          {
            ShopComment.map((item, index) => {
              const {
                content,
                createTime,
                name,
                email,
                avatar
              } = item;
              return (
                <div className={s.card} key={index}>
                  <div className={s.avatar}>
                    <Avatar 
                      style={{'--border-radius': '50%'}} 
                      src={avatar}
                      onClick={() => onclickAvatar(email)}
                    />
                  </div>
                  <div className={s.content}>
                    <div className={s.userName}>{name}·{formatDate(createTime)}</div>
                    <div className={s.content}>{content}</div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className={s.footer}>
        <div className={s.left}></div>
        <div className={s.right}>
          <Button 
            shape="rounded"
            onClick={onClickPublish}
            style={{
              '--background-color': '#f3f3f3',
              'fontSize': '16px',
              'fontWeight': 'bold'
            }}
            fill="solid"
          >
            卖同款
          </Button>
          <Button
            shape="rounded"
            onClick={onClickChat}
            style={{
              '--background-color': '#ffe700d6',
              'fontSize': '16px',
              'fontWeight': 'bold'
            }}
            fill="solid"
          >
            我想要
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ShopDetail;