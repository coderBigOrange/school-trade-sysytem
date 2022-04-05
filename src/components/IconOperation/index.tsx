import React, { CSSProperties, ReactNode } from 'react';
import s from './style.module.less';

type IconOptProps = {
  Icon: ReactNode;
  text: string;
  onClick: () => void;
  style?: CSSProperties;
}

const IconOperation: React.FC<IconOptProps> = (props: IconOptProps) => {
  const {
    Icon,
    text,
    onClick,
    style = {}
    } = props;

  return (
    <div className={s.opBtn} onClick={() => onClick()}>
      <div className={s.iconWrap} style={{...style}}>
        {Icon}
      </div>
      <div className={s.text}>{text}</div>
    </div>
  )
}

export default IconOperation;