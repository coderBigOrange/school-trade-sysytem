import React from "react";
import BasePage from "../../components/BasePage";
import { UserOperateType } from "../../utils/interface"; 

const MyCollect: React.FC = () => {
  return (
    <BasePage type={UserOperateType.USER_COLLECT}  isShowShop={true} title="ζηζΆθ"/>
  )
}

export default MyCollect;