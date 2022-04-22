import React, { ReactNode } from "react";
import { Navigate, Route, Routes } from 'react-router-dom';
import { PermissionAuth } from "./PermissionAuth";
import {useLocation} from 'react-router-dom'
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import Message from '../pages/Message';
import Me from '../pages/Me';
import Page404 from '../pages/404';
import Publish from "../pages/Publish";
import MessageDetail from "../pages/MessageDetail";
import ShopDetail from "../pages/ShopDetail";
import SearchDetail from "../pages/SearchDetail";
import UserDetail from "../pages/UserDetail";
import UserAlter from "../pages/UserAlter";
import MySubscribe from "../pages/MySubscribe";
import MyFans from "../pages/MyFans";
import MyCollect from "../pages/MyCollect";
import MyLike from "../pages/MyLike";
import MyComment from '../pages/MyComment';
import Myshops from "../pages/MyShops";
import RecieveLike from "../pages/RecieveLike";
import ReceiveComment from "../pages/RecieveComment";
import ReceiveSubscribe from "../pages/RecieveSubscribe";
import ReceivePublish from "../pages/RecievePublish";

export type RouteConfig = {
  path: string; 
  element: ReactNode; 
	childRoutes?: RouteConfig[];
  auth?: boolean;
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
		auth: true,
		childRoutes: [
			{
				path: 'detail',
				element: <MessageDetail />,
			}
		]
	},
	{
		path: '/message/detail/:name/:avatar/:email',
		element: <MessageDetail />,
		auth: true,
	},
	{
		path: '/search',
		element: <SearchDetail />
	},
	{
		path: '/publish',
		element: <Publish />,
		auth: true
	},
	{
		path: '/me',
		element: <Me />,
		auth: true,
	},
	{
		path: '/alter',
		element: <UserAlter />,
		auth: true,
	},
	{
		path: '/mySubscribe',
		element: <MySubscribe />,
		auth: true
	},
	{
		path: '/myFans',
		element: <MyFans />,
		auth: true
	},
	{
		path: '/myCollect',
		element: <MyCollect />,
		auth: true
	},
	{
		path: '/myLike',
		element: <MyLike />,
		auth: true
	},
	{
		path: '/myComment',
		element: <MyComment />,
		auth: true
	},
	{
		path: '/myShops',
		element: <Myshops />,
		auth: true
	},
	{
		path: '/recieveLike',
		element: <RecieveLike />,
		auth: true,
	},
	{
		path: '/recieveComment',
		element: <ReceiveComment />,
		auth: true,
	},
	{
		path: '/recieveSubscribe',
		element: <ReceiveSubscribe />,
		auth: true,
	},
	{
		path: '/recievePublish',
		element: <ReceivePublish />,
		auth: true,
	},
	{
		path: '/userDetail/:email',
		element: <UserDetail />,
		auth: true
	},
	{
		path: '/shopDetail',
		element: <ShopDetail />
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
						const { element, auth, path, childRoutes} = item;
						//TODO: 子路由匹配问题
						const {childRouteElements, routeElement} = PermissionAuth({
							pathname,
							element,
							auth,
							childRoutes
						})
						return (
							<Route 
								key={path} 
								path={path} 
								element={routeElement} 
							/>
						)
					})
				}
				<Route path="*" element={<Navigate to="/404" replace />} />
			</Routes>
    </>
  )
}

export default MyRoutes;