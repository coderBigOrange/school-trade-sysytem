import React, { ReactNode } from 'react';
import {Navigate, Route} from 'react-router-dom';
import {useAppSelector} from '../hooks'

type PermissionProps = {
  pathname: string;
  element: ReactNode;
  auth?: boolean;
  childRoutes?: {
    path: string;
    element: ReactNode; 
  }[];
}

export const PermissionAuth = (props: PermissionProps) => {
  const { element, pathname, auth, childRoutes = [] } = props;
  // const token = useAppSelector(state => state.user.token)
  if(pathname === '/') {
    return {
      routeElement: <Navigate to='/home' replace />
    }
  }
  const isLogin = !!localStorage.getItem('token')
  //登录状态下如果访问登录页或者注册则直接跳转到首页
  if(isLogin) {
    if(pathname === '/login' || pathname === '/register') {
      return {
        routeElement: <Navigate to='/home' replace />
      }
    } else {
      //如果页面存在子路由，处理后返回
      const childRouteElements = childRoutes.map(item => {
        const {path, element} = item;
        return <Route key={path} path={path} element={element}/>
      })
      return {
        routeElement: element,
        childRouteElements
      };
    }
  } else {
    if(auth) {
      //未登录状态下如果页面需权限访问,跳转至登录页面
      return {
        routeElement: <Navigate to='/login' replace />
      }
    } else {
      return {
        routeElement: element,
      }
    }
  }
}