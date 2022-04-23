//展示简单的用户信息列表
import React from "react";
import { User } from "../../utils/interface";
import s from './style.moduel.less' ;
import { Avatar } from "antd-mobile";
import { useNavigate } from "react-router-dom";

const UserCard: React.FC<User&{isShowTip?: boolean}> = (props) => {
  const {
    userEmail,
    userAvatar,
    userName,
    userStudentInfo,
    isShowTip
  } = props;
  const navigate = useNavigate();
  const onClickUser = () => {
    navigate(`/userDetail/${userEmail}`)
  }

  return (
    <div className={s.user} onClick={onClickUser}>
      <div className={s.avatar}>
        <Avatar 
          style={{'--border-radius': '50%'}} 
          src={userAvatar}
        />
      </div>
      <div className={s.baseInfo}>
        <div className={s.userName}>
          {userName}
          {
            isShowTip && (
              <span className={s.tip}>关注了你</span>
            )
          }
        </div>
        <div className={s.otherInfo}>{userStudentInfo}</div>
      </div>
    </div>
  )
}

const UserList: React.FC<{
  userList: User[],
  isShowTip?: boolean;
}> = (props) => {
  const { userList = [], isShowTip = false} = props;
  return (
    <div className={s.userList}>
      {
        userList.map(item => {
          return (
            <UserCard {...item} key={item.userEmail} isShowTip={isShowTip} />
          )
        })
      }
    </div>
  )
}

export default  UserList;