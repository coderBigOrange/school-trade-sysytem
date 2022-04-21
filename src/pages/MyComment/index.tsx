import React from "react";
import BasePage from "../../components/BasePage";
import { UserOperateType } from "../../utils/interface"; 

const MyComment: React.FC = () => {
  return (
    <BasePage type={UserOperateType.USER_COMMENT} isShowShop={true} title="我评论的"/>
  )
}

export default MyComment;