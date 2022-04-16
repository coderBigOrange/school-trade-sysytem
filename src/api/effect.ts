import { SimpleMessage, MessageType } from '../utils/interface';
import request from './network';

export const UserLogin = async (data: {
  userEmail: string;
  password: string;
}) => {
  return request<{
    token: string;
    user: any
  }>({
    url: '/login',
    method: 'post',
    data,
  })
}

export const UserLogout = () => {

}

export const UserRegister = (data: {
  userEmail: string;
  password: string;
}) => {
  return request({
    url: '/register',
    method: 'post',
    data,
  })
}

export const GetUserInfo = () => {

}

export const GetShopList = async (data: {
  shopSort: number,
  page: number,
}) => {
  return request<any[]>({
    url: '/shops/shopList',
    method: 'get',
    headers: {
      Authorization: localStorage.getItem('token') || ''
    },
    params: data
  })
}

export const PublishShop = async(data: {
  shopTitle: string;
  shopDescription: string;
  shopImg: string[];
  shopSort: number;
  shopPrice: number;
  shopOwnerEmail: string;
}) => {
  return request<any>({
    url: '/shops/publish',
    method: 'post',
    headers: {
      Authorization: localStorage.getItem('token') || ''
    },
    data
  })
} 

export const GetQiNiuToken = () => {
  return request<{token: string; key: string}>({
    url: '/qiniu/token',
    method: 'get',
  })
}

//获取用户消息列表
export const GetMessageList = (data: {
  userEmail: string
}) => {
  return request<MessageType[]>({
    url: '/users/messageList',
    method: 'get',
    headers: {
      Authorization: localStorage.getItem('token') || ''
    },
    params: data
  })
}

//获取两个用户之间的信息
export const GetMessages = (data: {
  selfEmail: string;
  otherEmail: string;
}) => {
  return request<SimpleMessage[]>({
    url: '/messages/messages',
    method: 'get',
    headers: {
      Authorization: localStorage.getItem('token') || ''
    },
    params: data
  })
}
