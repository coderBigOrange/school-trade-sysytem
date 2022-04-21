/**
 * 其他用户的信息
 */
import React, { useEffect, useState } from "react";
import s from './style.module.less';
import { useParams } from "react-router-dom";
import { GetUserInfo, GetUserOperatedShopList, UserSubscribe, UserUnSubscribe } from "../../api/effect";
import { Shop, User, UserOperateType } from "../../utils/interface";
import { 
  Toast,
  Avatar,
  Divider
} from "antd-mobile";
import { formatDate } from "../../utils";
import ShopList from "../../components/ShopList";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { addSubScribe, deleteSubScribe } from "../../store/modules/user";
import { LeftOutline } from 'antd-mobile-icons';
import { useNavigate } from "react-router-dom";

const UserDetail: React.FC = () => {
  const [ userInfo, setUserInfo] = useState<User>({} as User);
  const [ userPublish, setUserPublish] = useState<Shop[]>([]);
  const [isSubScribe, setIsSubScribe] = useState(false);

  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { email } = useParams();
  const {
    userAvatar = '',
    userStudentInfo = '',
    userIntroduce = '',
    userBeSubscribed = [],
    userSubscribe = [],
    userBirth = '',
    userAddress = '',
    userGender = '',
    userName = '',
  } = userInfo || {};

  useEffect(() => {
    if(email) {
      if(email === user.userEmail) {
        navigate('/me')
      }
      (async () => {
        const [userInfo, userPublish] = await Promise.all([
          GetUserInfo({email}),
          GetUserOperatedShopList({email, type: UserOperateType.USER_PUBLISH})
        ]);
        if(userInfo.code === 200 && userPublish.code === 200) {
          setUserInfo(userInfo.data);
          setUserPublish(userPublish.data)

          if(user.userSubscribe.includes(userInfo.data.userEmail)) {
            console.log(user.userSubscribe)
            setIsSubScribe(true)
          }
        } else {
          Toast.show(userInfo.message)
        }
      })();
    }
  }, [email])

  const subscribe = async () => {
    const res = await UserSubscribe({
      selfEmail: user.userEmail,
      otherEmail: email || ''
    })
    const {
      code,
      message
    } = res;
    if(code === 200) {
      dispatch(addSubScribe(userInfo.userEmail))
      setIsSubScribe(true)
      setUserInfo(userInfo => {
        return {
          ...userInfo,
          userBeSubscribed: [...userBeSubscribed, user.userEmail]
        }
      })
    } else {
      Toast.show(message)
    }
  }
  const unSubscibe = async () => {
    const res = await UserUnSubscribe({
      selfEmail: user.userEmail,
      otherEmail: email || ''
    })
    const {
      code,
      message
    } = res;
    if(code === 200) {
      dispatch(deleteSubScribe(userInfo.userEmail))
      setIsSubScribe(false)
      setUserInfo(userInfo => {
        const newUserBeSubscribed = userInfo.userBeSubscribed.filter(item => item !== user.userEmail)
        return {
          ...userInfo,
          userBeSubscribed: newUserBeSubscribed
        }
      })
    } else {
      Toast.show(message)
    }
  }
  const hanleBack = () => {
    navigate(-1)
  }

  return (
    <div className={s.userDetail}>
      <div className={s.userInfo}>
        <div className={s.headerInfo}>
          <div className={s.background} ><LeftOutline onClick={hanleBack} /></div>
          <div className={s.top}>
            <div className={s.avatar}>
              <Avatar 
                style={{
                  '--border-radius': '50%',
                  '--size': '80px'
                }} 
                src={userAvatar}
              />
            </div>
            <div className={s.fans}>
              粉丝{userBeSubscribed.length}
            </div>
            <div className={s.care}>
              关注{userSubscribe.length}
            </div>
            {
              isSubScribe ? (
                <div className={s.unSubscribeBtn} onClick={unSubscibe}>
                  已关注
                </div>
              ) : (
                <div className={s.subscribeBtn} onClick={subscribe}>
                  +&nbsp;关注
                </div>
              )
            }
          </div>
        </div>
        <div className={s.bodyInfo}>
          <div className={s.name}>{userName}</div>
          <div className={s.studentInfo}>{userStudentInfo}</div>
          <div className={s.introduce}>{userIntroduce}</div>
          {
            userGender && (
              <div className={s.gender}>
                <span>性别：</span>
                {userGender === 1 ? '男' : '女'}
              </div>
            )
          }
          {
            userBirth && (
              <div className={s.aget}>
                <span>生日： </span>
                {formatDate(userBirth)}
              </div>
            )
          }
          {
            userAddress && (
              <div className={s.address}>
                <span>地址: </span>
                {userAddress}
              </div>
            )
          }
        </div>
      </div>
      <Divider >发布的商品</Divider>
      <div className={s.publishList}>
        <ShopList shopList={userPublish} />
      </div>
    </div>
  )
}

export default UserDetail;