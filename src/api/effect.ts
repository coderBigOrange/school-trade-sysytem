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
    url: '/users/publish',
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

export const GetMessages = (data: {
  selfEmail: string;
  otherEmail: string;
}) => {
  return request<SimpleMessage[]>({
    url: '/users/messages',
    method: 'get',
    headers: {
      Authorization: localStorage.getItem('token') || ''
    },
    params: data
  })
}
