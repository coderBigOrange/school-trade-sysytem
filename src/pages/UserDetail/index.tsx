/**
 * 其他用户的信息
 */
import React, { useEffect, useState } from "react";
import s from './style.module.less';
import { useParams } from "react-router-dom";
import { GetUserInfo, GetUserPublished } from "../../api/effect";
import { Shop, User } from "../../utils/interface";
import { 
  Toast,
  Avatar,
  Divider
} from "antd-mobile";
import { formatDate } from "../../utils";
import ShopList from "../../components/ShopList";

const UserDetail: React.FC = () => {
  const [ userInfo, setUserInfo] = useState<User>();
  const [ userPublish, setUserPublish] = useState<Shop[]>([]);
  const { email } = useParams();
  const {
    userAvatar = '',
    userStudentInfo = '',
    userIntroduce = '',
    userBeSubscribed = [],
    userSubscribe = [],
    userBirth,
    userAddress,
    userGender,
    userName,
  } = userInfo || {};

  useEffect(() => {
    if(email) {
      (async () => {
        const [userInfo, userPublish] = await Promise.all([
          GetUserInfo({email}),
          GetUserPublished({email})
        ]);
        if(userInfo.code === 200 && userPublish.code === 200) {
          setUserInfo(userInfo.data);
          setUserPublish(userPublish.data)
        } else {
          Toast.show(userInfo.message)
        }
      })();
    }
  }, [email])

  return (
    <div className={s.userDetail}>
      <div className={s.userInfo}>
        <div className={s.headerInfo}>
          <div className={s.background} />
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
            <div className={s.subscribeBtn}>
              +&nbsp;关注
            </div>
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