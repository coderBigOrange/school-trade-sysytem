import React from "react";
import BasePage from "../../components/BasePage";
import { UserOperateType } from "../../utils/interface"; 

const MySubscribe: React.FC = () => {
  return (
    <BasePage type={UserOperateType.USER_BE_SUBSCRIBE}  isShowShop={false} title="ζηη²δΈ"/>
  )
}

export default MySubscribe;