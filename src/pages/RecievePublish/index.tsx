import React from "react";
import BasePage from "../../components/BasePage";
import { UserOperateType } from "../../utils/interface"; 

const ReceivePublish: React.FC = () => {
  return (
    <BasePage type={UserOperateType.USER_PUBLISH} isReceive={true}  isShowShop={false} title="关注的人的商品通知"/>
  )
}

export default ReceivePublish;