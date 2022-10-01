import axios from 'axios';
// import QueryString from 'qs';
import type { AxiosRequestConfig, AxiosRequestHeaders, AxiosInstance } from 'axios';

import { API_DOMAIN } from './config';
import { axiosErrorHandler } from './errorHandler';

interface RequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders;
}

const defaultConfig: RequestConfig = {
  baseURL: API_DOMAIN,
  timeout: 120 * 1000,
  withCredentials: true,
  headers: {
    'content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
};

const request = (method: 'get' | 'post', url: string, params?: any, config?: AxiosRequestConfig) => {
  const finalConfig: RequestConfig = { ...defaultConfig, ...config };
  const instance: AxiosInstance = axios.create(finalConfig);

  instance.interceptors.response.use(
    response => {
      // if (response.status === 200 && response.data.success) { <-- 원래라면 api에서 success를 넘겨주겠지만 오픈 소스 api라 그런지 안넘겨줌
      // throw 9;
      if (response.status === 200) {
        return response.data;
      } else {
        console.log((response.data && response.data.message) || 'Oops Something wrong');
        return Promise.reject(response.data);
      }
    },
    error => {
      if (error.response.status < 500) {
      }
      return Promise.reject(error);
    },
  );

  if (params) {
    Object.keys(params as object).forEach(item => {
      if (item && (params[item] === undefined || params[item] === null)) {
        delete params[item];
      }
    });
  }

  return instance({
    method,
    url,
    params: method === 'get' && params,
    data: method === 'post' && params,
  });
};
export default request;
