import React from "react";
import BasePage from "../../components/BasePage";
import { UserOperateType } from "../../utils/interface"; 

const ReceivePublish: React.FC = () => {
  return (
    <BasePage type={UserOperateType.USER_PUBLISH} isReceive={true}  isShowShop={true} title="关注用户新发布"/>
  )
}

export default ReceivePublish;