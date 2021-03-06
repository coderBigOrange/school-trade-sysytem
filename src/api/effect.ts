import { 
  SimpleMessage, 
  MessageType,
  Shop,
  Comment,
  User,
  SearchType
} from '../utils/interface';
import request from './network';

export const UserLogin = async (data: {
  userEmail: string;
  password: string;
}) => {
  return request<{
    token: string;
    user: User
  }>({
    url: '/login',
    method: 'post',
    data,
  })
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

export const GetUserInfo = (data: {
  email: string
}) => {
  return request<User>({
    url: '/users/info',
    method: 'get',
    params: data
  })
}

export  const GetUserOperatedShopList = (data: {
  email: string,
  type: string
}) => {
  return request<Shop[]>({
    url: '/users/getOperatedShopsList',
    method: 'get',
    params: data
  })
}
export  const GetOperatedUserList = (data: {
  email: string,
  type: string
}) => {
  return request<User[]>({
    url: '/users/getOperatedUserList',
    method: 'get',
    params: data
  })
}

export const UserLike = (data: {
  email: string;
  name: string;
  shopId: string;
}) => {
  return request({
    url: '/users/like',
    method: 'post',
    headers: {
      Authorization: localStorage.getItem('token') || ''
    },
    data
  })
}

export const UserCancelLike = (data: {
  email,
  shopId
}) => {
  return request({
    url: '/users/cancelLike',
    method: 'post',
    headers: {
      Authorization: localStorage.getItem('token') || ''
    },
    data
  })
}

export const UserCollect = (data: {
  email: string;
  name: string;
  shopId: string;
}) => {
  return request({
    url: '/users/collect',
    method: 'post',
    headers: {
      Authorization: localStorage.getItem('token') || ''
    },
    data
  })
}

export const UserCancelCollect = (data: {
  email,
  shopId
}) => {
  return request({
    url: '/users/cancelCollect',
    method: 'post',
    headers: {
      Authorization: localStorage.getItem('token') || ''
    },
    data
  })
}

export const UserSubscribe = (data: {
  selfEmail: string;
  otherEmail: string;
}) => {
  return request({
    url: '/users/subscribe',
    method: 'post',
    headers: {
      Authorization: localStorage.getItem('token') || ''
    },
    data
  })
}

export const UserUnSubscribe = (data: {
  selfEmail: string;
  otherEmail: string;
}) => {
  return request({
    url: '/users/unSubscribe',
    method: 'post',
    headers: {
      Authorization: localStorage.getItem('token') || ''
    },
    data
  })
}

export  const UserComment = (data: {
  content: string, 
  email: string, 
  avatar: string, 
  name: string,
  shopId: string,
}) => {
  return request<Comment>({
    url:'/users/comment',
    method: 'post',
    headers: {
      Authorization: localStorage.getItem('token') || ''
    },
    data
  })
}

export const GetShopList = async (data: {
  shopSort: string,
  page: number,
  email?: string;
}) => {
  return request<Shop[]>({
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
  link?: string;
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

export const UnPublishShop = async (data: {
  shopId: string;
  shopState: number;
}) => {
  return request<any>({
    url: '/users/unPublish',
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

//????????????????????????
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

//???????????????
export const PinMessageItem = (data: {
  selfEmail: string;
  otherEmail: string;
}) => {
  return request<MessageType[]>({
    url: '/users/pinMessageItem',
    method: 'post',
    headers: {
      Authorization: localStorage.getItem('token') || ''
    },
    data
  })
}
//???????????????
export const DeleteMessageItem = (data: {
  selfEmail: string;
  otherEmail: string;
}) => {
  return request<MessageType[]>({
    url: '/users/deleteMessageItem',
    method: 'post',
    headers: {
      Authorization: localStorage.getItem('token') || ''
    },
    data
  })
}

//?????????????????????????????????
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

//????????????????????????
export const GetSearch = (data: {
  type: SearchType;
  value: string;
}) => {
  return request<User[]|Shop[]>({
    url: '/shops/search',
    method: 'get',
    params: data
  })
}

//????????????????????????
export const AlterUserInfo = (data: {
  userName: string;
  userGender: number;
  userAvatar: string;
  userStudentInfo: string;
  userIntroduce: string;
  userBirth: Date;
  userAddress: string;
  userEmail: string
}) => {
  return request({
    url: '/users/alterUser',
    method: 'post',
    data
  })
}

export const GetUserPublishedShopInfos = (
  params: {
    email: string;
  }
) => {
  return request<Shop[]>({
    url: '/users/myShops',
    method: 'get',
    params
  })
}

export const GetUserSubscribeShops = (params: {
  email: string
}) => {
  return request<Shop[]>({
    url: '/users/subscribeShops',
    method: 'get',
    params
  })
}
