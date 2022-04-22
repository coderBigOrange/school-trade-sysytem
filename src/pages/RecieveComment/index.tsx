import React from "react";
import BasePage from "../../components/BasePage";
import { UserOperateType } from "../../utils/interface"; 

const ReceiveComment: React.FC = () => {
  return (
    <BasePage type={UserOperateType.USER_COMMENT} isReceive={true}  isShowShop={false} title="收到的评论"/>
  )
}

export default ReceiveComment;