import React from "react";
import BasePage from "../../components/BasePage";
import { UserOperateType } from "../../utils/interface"; 

const MySubscribe: React.FC = () => {
  return (
    <BasePage type={UserOperateType.USER_SUBSCRIBE}  isShowShop={false} title="我关注的人"/>
  )
}

export default MySubscribe;