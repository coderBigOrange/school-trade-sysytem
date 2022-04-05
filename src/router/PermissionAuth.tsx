import React, { ReactNode } from 'react';
import {Navigate} from 'react-router-dom';

type PermissionProps = {
  pathname: string;
  element: ReactNode;
  auth?: boolean;
}

export const PermissionAuth = (props: PermissionProps) => {
  const { element, pathname, auth } = props;
  if(pathname === '/') {
    return <Navigate to='/home' replace />
  }
  const isLogin = !!localStorage.getItem('token');//暂时只通过localStorage的token字段判断是否登录
  //登录状态下如果访问登录页或者注册则直接跳转到首页
  if(isLogin) {
    if(pathname === '/login' || pathname === '/register') {
      return <Navigate to='/home' replace />
    } else {
      return element;
    }
  } else {
    if(auth) {
      //未登录状态下如果页面需权限访问,跳转至登录页面
        return<Navigate to='/login' replace/>
    } else {
      return element
    }
  }
}