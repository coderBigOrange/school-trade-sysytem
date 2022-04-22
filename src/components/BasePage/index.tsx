import React, {useState, useEffect} from "react";
import s from './style.module.less';
import { useNavigate } from "react-router-dom";
import {
  GetUserOperatedShopList,
  GetOperatedUserList,
  GetUserPublishedShopInfos
} from "../../api/effect";
import { useAppSelector } from "../../hooks";
import { Shop,  User, UserOperateType, ComponentState} from "../../utils/interface";
import ShopList from "../../components/ShopList";
import UserList from "../UserList";
import OperateCardList from "../OperatedCardList";
import ComponentWrap from "../../components/ComponentWrap";

import {
  NavBar, 
  Toast
} from 'antd-mobile'


type BaseProps = {
  title: string;
  type: UserOperateType;
  isShowShop: boolean;
  isReceive?: boolean;
}

const BasePage: React.FC<BaseProps> = (props) => {
  const {
    title,
    type,
    isShowShop,
    isReceive
  } = props;
  const navigate = useNavigate();
  const [dataList, setDataList] = useState<Shop[] | User[]>([]);
  const userEmail = useAppSelector(state => state.user.userEmail)

  useEffect(() => {
    if(userEmail && type) {
      (async () => {
        if(isReceive) {
          const res = await GetUserPublishedShopInfos({email: userEmail})
          const {
            code,
            data,
            message
          } = res;
          if(code === 200) {
            setDataList(data)
          } else {
            Toast.show(message)
          }
        } else {
          if(isShowShop) {
            const res = await GetUserOperatedShopList({
              email: userEmail,
              type
            })
            const {
              code,
              data,
              message
            } = res;
            if(code === 200) {
              setDataList(data)
            } else {
              Toast.show(message)
            }
          } else {
            const res = await GetOperatedUserList({
              email: userEmail,
              type
            })
            const {
              code,
              data,
              message
            } = res;
            if(code === 200) {
              setDataList(data)
            } else {
              Toast.show(message)
            }
          }
        }
      })();
    }
  }, [userEmail, type, isShowShop, isReceive])
  const getChidren = () => {
    if(isReceive) {
      return (
        <ComponentWrap state={dataList.length > 0 ? ComponentState.OK : ComponentState.EMPTY}>
          <OperateCardList shopList={dataList as Shop[]} type={type} />
        </ComponentWrap>
      )
    } else {
      return (
        <>
          {
            isShowShop ? (
              <ComponentWrap state={dataList.length > 0 ? ComponentState.OK : ComponentState.EMPTY}>
                <ShopList shopList={dataList as Shop[]} />
              </ComponentWrap>
            ) : (
              <ComponentWrap state={dataList.length > 0 ? ComponentState.OK : ComponentState.EMPTY}>
                <UserList userList={dataList as User[]} />
              </ComponentWrap>
            )
          }
        </>
      )
    }
  }
  return (
    <div className={s.basePage}>
      <NavBar onBack={() => navigate(-1)}>{title}</NavBar>
      <div className={s.body}>
        {
          getChidren()
        }
      </div>
    </div>
  )
}

export default BasePage;