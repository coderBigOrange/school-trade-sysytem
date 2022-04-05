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
