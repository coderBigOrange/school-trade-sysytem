import React from 'react';
import { TabBar } from 'antd-mobile';
import {useNavigate,useLocation} from 'react-router-dom';
import s from './style.module.less';
import {
  AppOutline,
  MessageOutline,
  UserOutline,
} from 'antd-mobile-icons';

const { Item } = TabBar;
const tabs = [
  {
    key: '/home',
    title: '首页',
    icon: <AppOutline />,
  },
  {
    key: '/message',
    title: '我的消息',
    icon: <MessageOutline />,
  },
  {
    key: '/me',
    title: '个人中心',
    icon: <UserOutline />,
  },
] 

const TabButton: React.FC = () => {
  const navigator = useNavigate();
  const location = useLocation()
  const { pathname } = location

  const handleTabChange = (key: string) => {
    navigator(key) 
  } 
  return (
    <div className={s.tabBar}>
      <TabBar activeKey={pathname} onChange={handleTabChange}>
        {
          tabs.map(item => {
            return (
              <Item {...item} />
            )
          })
        }
      </TabBar>
    </div>
  )
}

export default  TabButton;