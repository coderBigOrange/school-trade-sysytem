import React from "react";
import BasePage from "../../components/BasePage";
import { UserOperateType } from "../../utils/interface"; 

const MyCollect: React.FC = () => {
  return (
    <BasePage type={UserOperateType.USER_COLLECT}  isShowShop={true} title="我的收藏"/>
  )
}

export default MyCollect;