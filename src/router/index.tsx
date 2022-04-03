import React, { ReactNode } from "react";
import { Routes } from 'react-router-dom';
import { PermissionAuth } from "./PermissionAuth";
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import Page404 from '../pages/404';
export type RouteConfig = {
  path: string; 
  element: ReactNode; 
  auth?: boolean
}
export const routerConfig:RouteConfig[] = [
	{
		path: '/',
		element: <Home />,
		auth: true
	},
	{
		path: '/login',
		element: <Login />
	},
	{
		path: '/register',
		element: <Register />
	},
	{
		path: '/404',
		element: <Page404 />,
		auth: true
	}
]
const MyRoutes = () => {
  return (
    <>
      <Routes>    
        <PermissionAuth configs={routerConfig} />
      </Routes>
    </>
  )
}

export default MyRoutes;