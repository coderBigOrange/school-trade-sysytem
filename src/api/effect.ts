import request from './network';

export const UserLogin = async (data: {
  userEmail: string;
  password: string;
}) => {
  return request<{token: string}>({
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
  page: number
}) => {
  return request<any[]>({
    url: '/shops/shopList',
    method: 'get',
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
    data
  })
} 

export const GetQiNiuToken = () => {
  return request<{token: string; key: string}>({
    url: '/qiniu/token',
    method: 'get'
  })
}
