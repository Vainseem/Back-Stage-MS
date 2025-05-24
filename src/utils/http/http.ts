import axios, {AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from "axios";
import {store} from "../../store";
const http:AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 5000,
})
//请求拦截器
http.interceptors.request.use((config:InternalAxiosRequestConfig)=>{
    const {token} = store.getState().authSlice
    if (token){//有token的前提下一定已经登陆了，所以就可以携带token
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})
//响应拦截器
http.interceptors.response.use((response:AxiosResponse)=>{
    const res = response.data;
    if (res.code !== 200) {
        throw Error(res.message);
    }
    return res;
})

export default http;