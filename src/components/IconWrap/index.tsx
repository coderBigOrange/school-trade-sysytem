/**
 * 封装便于使用阿里矢量图库
 */
import React from 'react'
import s from './style.module.less';

type IconWrapProps = {
  size?: number;
  iconName: string;
}

const IconWrap: React.FC<IconWrapProps> = (props) => {
  const { iconName = '', size = 36} = props;
  return (
    <div style={{fontSize: size}}>
      <svg className={s.icon} aria-hidden="true">
        <use xlinkHref={`#${iconName}`}></use>
      </svg>
    </div>
  )
}

export default IconWrap;