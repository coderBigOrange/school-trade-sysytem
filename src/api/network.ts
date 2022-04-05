//TODO: 对返回值的类型进行限制 Solved
import axios, { AxiosRequestConfig } from 'axios';
import { IResponseData } from '../utils/interface';

// 创建axios实例
const service = axios.create({
    baseURL: 'http://localhost:8080/',
    timeout: 10000
});

// 请求拦截器
service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      return config; 
    }, 
    error => {
      return Promise.reject(error);
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      return Promise.reject(error);
    }
)

//封装request请求,增加类型限制
const request = async <T>(config: AxiosRequestConfig) => {
    return service.request<IResponseData<T>>(config).then(res => res.data);
}

export default request;
