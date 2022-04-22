import React, { ReactNode } from 'react';
import s from './style.moduel.less';

type VerticalProps = {
  children: ReactNode,
  onClick?: () => void;
}

const VerticalFlexBox: React.FC<VerticalProps> = (props) => {
  const {
    children,
    onClick = () => {}
  } = props;
  return (
    <div 
      className={s.box}
      onClick={() => onClick()}
    >
      {children}
    </div>
  )
}

export default VerticalFlexBox;