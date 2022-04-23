import React from "react";
import BasePage from "../../components/BasePage";
import { UserOperateType } from "../../utils/interface"; 

const ReceivePublish: React.FC = () => {
  return (
    <BasePage type={UserOperateType.USER_PUBLISH} isReceive={true}  isShowShop={true} title="我关注的"/>
  )
}

export default ReceivePublish;