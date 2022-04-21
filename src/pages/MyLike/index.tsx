import React from "react";
import BasePage from "../../components/BasePage";
import { UserOperateType } from "../../utils/interface"; 

const MyLike: React.FC = () => {
  return (
    <BasePage type={UserOperateType.USER_LIKE} isShowShop={true} title="我点赞的"/>
  )
}

export default MyLike;