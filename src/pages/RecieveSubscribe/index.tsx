import React from "react";
import BasePage from "../../components/BasePage";
import { UserOperateType } from "../../utils/interface"; 

const ReceiveSubscribe: React.FC = () => {
  return (
    <BasePage type={UserOperateType.USER_BE_SUBSCRIBE} isReceive={true}  isShowShop={false} title="关注我的"/>
  )
}

export default ReceiveSubscribe;