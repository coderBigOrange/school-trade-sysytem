import React, { ReactNode } from "react";
import { Navigate, Route, Routes } from 'react-router-dom';
import { PermissionAuth } from "./PermissionAuth";
import {useLocation} from 'react-router-dom'
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import Message from '../pages/Message';
import User from '../pages/User';
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
	},
	{
		path: '/home',
		element: <Home />,
	},
	{
		path: '/message',
		element: <Message />,
		auth: true
	},
	{
		path: '/me',
		element: <User />,
		auth: true,
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
	const { pathname } = useLocation();
	//TODO: react-router-dom不再支持自定义路由组件，现在倾向于使用组件包装器；因此有必要更多的了解React-Router V6版本
  return (
    <>
			<Routes>   
				{
					routerConfig.map(item => {
						const { element, auth, path} = item;
						const childElement = PermissionAuth({
							pathname,
							element,
							auth
						})
						return <Route key={path} path={path} element={childElement} />
					})
				}
				<Route path="*" element={<Navigate to="/404" replace />} />
			</Routes>
    </>
  )
}

export default MyRoutes;