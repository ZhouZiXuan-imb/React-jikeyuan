import axios from "axios";
import {getLocalStorageToken} from "@/utils/localStorageFn";
import {message} from "antd";

const baseURL = "http://toutiao.itheima.net/v1_0"

// 不带token的axios实例
const instanceWidthOutToken = axios.create({
    baseURL: baseURL
});
// 带token的axios实例
const instanceWidthToken = axios.create({
    baseURL: baseURL
});
// 请求、响应成功是的回调函数
const onResponseFulfilled = (response) => {
    return response.data;
};
// 请求、响应拦截器错误时的回调函数
const onRejected = (response) => {
    return response.data;
};
// 带token的请求拦截器
instanceWidthToken.interceptors.request.use((config) => {
    const token = getLocalStorageToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
// 带token的响应拦截器
instanceWidthToken.interceptors.response.use(onResponseFulfilled, async (error) => {
    if(error.response.status === 401) {
        message.error("用户过期，请重新登录")

        window.location.href = 'http://localhost:3000/login'

        return error.response
    }
    return Promise.reject(error);
});
// 不带token的请求拦截器
instanceWidthOutToken.interceptors.request.use((config) => {
    return config;
});
// 不带token的响应拦截器
instanceWidthOutToken.interceptors.response.use(onResponseFulfilled, onRejected);
const methods = ["get", "post", "put", "delete"];

// 使用reduce方法把methods数组中的元素累加到对象中作为键
const requestWidthToken = methods.reduce((requestMethods, method) => {
    // 每次循环都给requestMethods中添加属性
    requestMethods[method] = (url, data) => {
        // ts好像不能自动识别循环中的变量，所以需要每次循环的时候判断
        switch (method) {
            case "get":
                return instanceWidthToken[method](url, {params: data})
            case "post":
                return instanceWidthToken[method](url, data)
            case "put":
                return instanceWidthToken[method](url, data)
            case "delete":
                return instanceWidthToken[method](url, {params: data})
            default :
                return false;
        }
    }
    return requestMethods;
}, {})

// 使用reduce方法把methods数组中的元素累加到对象中作为键
const requestWidthOutToken = methods.reduce((requestMethods, method) => {
    // 每次循环都给requestMethods中添加属性
    requestMethods[method] = (url, data) => {
        // ts好像不能自动识别循环中的变量，所以需要每次循环的时候判断
        switch (method) {
            case "get":
                return instanceWidthOutToken[method](url, {params: data})
            case "post":
                return instanceWidthOutToken[method](url, data)
            case "put":
                return instanceWidthOutToken[method](url, data)
            case "delete":
                return instanceWidthOutToken[method](url, {params: data})
            default :
                return false;
        }
    }
    return requestMethods;
}, {})

export {requestWidthToken, requestWidthOutToken};
