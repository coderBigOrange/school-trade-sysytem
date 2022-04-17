export enum CheckState {
  EMPTY = 0,
  WRONG =1,
  OK =2
}
export interface IResponseData<T = any>{
  code: number;
  message: string;
  data: T;
}

export enum ShopSort {
  STUDY  = 1,
  DIGITAL = 2,
  SPORTS = 3,
  ART = 4,
  CLOTHES = 5,
  DAILY_NECESSITIES = 6,
  FOOD = 7,
  OTHER = 8
}
export type MessageType = {
	email: string;
	content: string;
	avatar: string;
	name: string;
	createTime: string;
}


export type SimpleMessage = {
  senderEmail: string;
  recieverEmail: string;
  content: string;
  createTime: string;
}

export enum  ComponentState {
  LODING = 1,
  EMPTY = 2,
  ERROR = 3,
  OK = 4
}

export type Comment = {
  content: string;
  email: string;
  name: string;
  likeCnt: number;
  createTime: string;
  avatar: string;
}

export type Like = {
  email: string;
  name: string;
  createTime: string;
}
export type Collect = {
  email: string;
  name: string;
  createTime: string;
}

export type Shop = {
  shopId: string;
  shopOwnerEmail: string;
  shopTitle: string;
  shopDescription: string;
  shopPrice: number;
  shopSort: string;
  shopImgs: string[];
  shopLike: Like[],
  ShopComment: Comment[],
  shopCollect: Collect[],
  userAvatar: string;
  userName: string;
  userStudentInfo: string;
}

export const sorts = [
  {
    label: '关注',
    value: 'care'
  },
  {
    label: '推荐',
    value: 'recommend'
  },
  {
    label: '学习',
    value: 'study'
  },
  {
    label: '数码',
    value: 'digital'
  },
  {
    label: '体育',
    value: 'sport'
  },
  {
    label: '艺术',
    value: 'art'
  },
  {
    label: '日用品',
    value: 'daily'
  },
  {
    label: '服饰',
    value: 'clothe'
  },
  {
    label: '食品',
    value: 'food'
  },
  {
    label: '其他',
    value: 'other'
  },
]