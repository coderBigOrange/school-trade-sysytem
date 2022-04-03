import axios from 'axios';

// 创建axios实例
const service = axios.create({
    baseURL: 'http://localhost:8080/',
    timeout: 10000
});

// 请求拦截器
service.interceptors.request.use(
    config => {
        return config;
    }, 
    error => {
        return Promise.reject(error);
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
      return response.data;
    },
    error => {
      return Promise.reject(error);
    }
)

export default service;
