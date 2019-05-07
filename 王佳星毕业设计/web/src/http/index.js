// 请求封装
import axios from 'axios';
import { baseUrl } from './baseUrl';
axios.defaults.baseURL = baseUrl;
axios.defaults.timeout = 200000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// axios拦截器，拦截请求
axios.interceptors.request.use(config => {
   
    return config;
});
// axios拦截器，拦截响应
axios.interceptors.response.use(
    res => {
        return Promise.resolve(res);
    },
    err => {
        return Promise.reject(err);
    }
);

export default axios;