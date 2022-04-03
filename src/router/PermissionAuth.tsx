import React from 'react';
import { Route, Navigate, useLocation} from 'react-router-dom';
import { RouteConfig } from '.';

export const PermissionAuth: React.FC<{configs: RouteConfig[]}> = (props) => {
  const { configs } = props;
  const { pathname } = useLocation(); 
  const targetConfig = configs.find(item => item.path === pathname);
  if(targetConfig && !targetConfig.auth) {
    const { element,path }  = targetConfig;
    return (
      <Route path={path} element={element} />
    )
  }
  return (
    <Route path='*' element={<Navigate to={'/404'} />}/>
  )
}