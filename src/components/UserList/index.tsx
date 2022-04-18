import React from "react";
import { User } from "../../utils/interface";
import s from './style.moduel.less' ;
import { Avatar } from "antd-mobile";
import { useNavigate } from "react-router-dom";

const UserCard: React.FC<User> = (props) => {
  const {
    userEmail,
    userAvatar,
    userName,
    userStudentInfo
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
        <div className={s.userName}>{userName}</div>
        <div className={s.otherInfo}>{userStudentInfo}</div>
      </div>
    </div>
  )
}

const UserList: React.FC<{userList: User[]}> = (props) => {
  const { userList = []} = props;
  return (
    <div className={s.userList}>
      {
        userList.map(item => {
          return (
            <UserCard {...item} key={item.userEmail} />
          )
        })
      }
    </div>
  )
}

export default  UserList;