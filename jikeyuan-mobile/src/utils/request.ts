import axios, {
  AxiosError,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { Toast } from "antd-mobile";
import { removeToken } from "@/utils/token";

let baseURL = "http://geek.itheima.net/v1_0";

// 不带token的axios实例
const instanceWidthOutToken = axios.create({ baseURL });

// 带token的axios实例
const instanceWidthToken = axios.create({ baseURL });

// 请求、响应成功时的回调函数
const onResponseFulfilled = (response: AxiosResponse) => {
  return response.data;
};
// 请求、响应拦截器错误时的回调函数
const onRejected = (response: AxiosResponse) => {
  return response.data;
};

// 带token的请求拦截器
instanceWidthToken.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token: string = localStorage.getItem("jky-mobile-token") || "";
    if (token) {
      config.headers!.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// 带token的响应拦截器
instanceWidthToken.interceptors.response.use(
  onResponseFulfilled,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // 401 未授权
      // 1. 跳转到登录页
      Toast.show({
        icon: "error",
        content: "用户未授权",
        position: "center",
      });

      removeToken();

      window.location.href = `${window.location.origin}/login`;
    }
    return Promise.reject(error);
  }
);

// 不带token的请求拦截器
instanceWidthOutToken.interceptors.request.use((config: AxiosRequestConfig) => {
  return config;
});
// 不带token的响应拦截器
instanceWidthOutToken.interceptors.response.use(
  onResponseFulfilled,
  onRejected
);

// 把方法名称保存在数组中
const methods: Array<"get" | "post" | "put" | "delete"> = [
  "get",
  "post",
  "put",
  "delete",
];
type Methods = typeof methods[number];

// 声明类型
type requestType = {
  [p in Methods]: (url: string, data?: {}) => AxiosPromise;
};

// 使用reduce方法把methods数组中的元素累加到对象中作为键
const requestWidthToken = methods.reduce((requestMethods, method) => {
  // 每次循环都给requestMethods中添加属性
  requestMethods[method] = (url, data) => {
    // ts好像不能自动识别循环中的变量，所以需要每次循环的时候判断
    switch (method) {
      case "get":
        return instanceWidthToken[method](url, { params: data });
      case "post":
        return instanceWidthToken[method](url, data);
      case "put":
        return instanceWidthToken[method](url, data);
      case "delete":
        return instanceWidthToken[method](url, { params: data });
    }
  };
  return requestMethods;
}, {} as requestType);

// 使用reduce方法把methods数组中的元素累加到对象中作为键
const requestWidthOutToken = methods.reduce((requestMethods, method) => {
  // 每次循环都给requestMethods中添加属性
  requestMethods[method] = (url, data) => {
    // ts好像不能自动识别循环中的变量，所以需要每次循环的时候判断
    switch (method) {
      case "get":
        return instanceWidthOutToken[method](url, { params: data });
      case "post":
        return instanceWidthOutToken[method](url, data);
      case "put":
        return instanceWidthOutToken[method](url, data);
      case "delete":
        return instanceWidthOutToken[method](url, { params: data });
    }
  };
  return requestMethods;
}, {} as requestType);

export { requestWidthToken, requestWidthOutToken };
