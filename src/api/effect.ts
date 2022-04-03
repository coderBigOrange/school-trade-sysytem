import server from './network';

export const UserLogin = (data: {
  userEmail: string;
  password: string;
}) => {
  return server({
    url: '/users/login',
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
  return server({
    url: '/users/register',
    method: 'post',
    data,
  })
}

export const GetShopList = () => {
  
}

export const GetUserInfo = () => {

}