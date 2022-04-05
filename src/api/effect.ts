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

export const GetShopList = () => {
  
}

export const GetUserInfo = () => {

}

export const MockGetShopList = () => {
  let promise = new Promise((resovle: ((value: number[]) => void), reject) => {
    setTimeout(() => resovle([1,2,3,4,5]), 1000)
  })
  return promise;
}