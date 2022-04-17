import React from "react";
import { 
  SpinLoading,
  Empty,
  ErrorBlock
} from 'antd-mobile';
import { ComponentState } from '../../utils/interface';
import s from './style.module.less'

type ComponentWrapProps = {
  state: ComponentState
  children?: React.ReactChild;
}

const ComponentWrap: React.FC<ComponentWrapProps> = (props) => {
  const {
    state,
    children
  } = props;
  if(state === ComponentState.OK) {
    return (
      <>
        {
          children
        }
      </>
    )
  } else if(state === ComponentState.LODING) {
    return (
      <div className={s.unNormal}>
        <SpinLoading />
      </div>
    )
  } else if(state === ComponentState.EMPTY) {
    return (
      <div className={s.unNormal}>
        <Empty description="暂无数据" />
      </div>
    )
  } else {
    return (
      <div className={s.unNormal}>
        <ErrorBlock status="default"/>
      </div>
    )
  }
}

export default ComponentWrap;