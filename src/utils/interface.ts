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