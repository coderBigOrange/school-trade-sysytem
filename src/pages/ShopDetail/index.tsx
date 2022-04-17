import React, { useRef }  from "react";
import s from './style.module.less';
import {
  NavBar,
  Avatar,
  Image,
  Button,
  TextArea
} from 'antd-mobile';
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { formatDate } from "../../utils";

const ShopDetail: React.FC = () => {
  const navigate = useNavigate();
  const detailInfo = useAppSelector(state => state.shopDetail);
  const userInfo = useAppSelector(state => state.user);
  const messRef = useRef(null);

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

  const fakeComment = {
    email: '1810410221@student.cumtb.edu.cn',
    avatar: userInfo.avatar,
    content: '你们是考试科目v律师代',
    createTime: +new Date(),
    name: '橙子',
    likeCnt: 0,
  }

  const onSubScribe = () => {
    console.log('subscibe')
  }
  const onclickAvatar = (email: string) => {
    console.log(email)
  }
  const sendMessage = () => {
    console.log('评论');
    (messRef.current as any).clear();
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
                  onClick={sendMessage}
                >
                  发送
                </Button>
              </div>
            </div>
          </div>
        <div className={s.comment}>
          <div className={s.title}>评论</div>
          {
            [fakeComment,fakeComment, fakeComment].map(item => {
              const {
                content,
                createTime,
                name,
                email,
                avatar
              } = item;
              return (
                <div className={s.card}>
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