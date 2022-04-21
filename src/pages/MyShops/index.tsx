import React from "react";
import BasePage from "../../components/BasePage";
import { UserOperateType } from "../../utils/interface"; 

const MyShops: React.FC = () => {
  return (
    <BasePage type={UserOperateType.USER_PUBLISH} isShowShop={true} title="我发布的"/>
  )
}

export default MyShops;