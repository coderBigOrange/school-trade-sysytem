import React from "react";
import BasePage from "../../components/BasePage";
import { UserOperateType } from "../../utils/interface"; 

const RecieveLike: React.FC = () => {
  return (
    <BasePage type={UserOperateType.USER_LIKE} isReceive={true}  isShowShop={false} title="收到的点赞"/>
  )
}

export default RecieveLike;