import axios, { AxiosResponse } from 'axios';
import type { AxiosRequestConfig, AxiosRequestHeaders, AxiosInstance } from 'axios';
import { API_DOMAIN } from './config';
import { ResponseData } from 'apis';

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

const request = (
  method: 'get' | 'post',
  url: string,
  params?: Record<string, unknown>,
  config?: AxiosRequestConfig,
  interceptor?: {
    request?: any;
    response?: any;
  },
): any => {
  const finalConfig: RequestConfig = { ...defaultConfig, ...config };
  const instance: AxiosInstance = axios.create(finalConfig);

  instance.interceptors.request.use(request => {
    if (interceptor?.request && typeof interceptor.request === 'function') {
      return interceptor.request(request);
    }
    return request;
  });

  instance.interceptors.response.use(
    (response: AxiosResponse<ResponseData>): ResponseData | Promise<never> => {
      /**
      @author kich555
      @description 실질적인 업무레벨 api response에서는 row data를 따로 wrapping 할 ResponseData구조체가 있겠지만, 이 프로젝트에서 default tester 로 사용하고 있는 open source api에서는 row data를 바로 반환하므로 아래의 조건식을 주석처리 했다.
      if (response.status === 200 && response.data.success) 
       */
      if (response.status === 200) {
        if (interceptor?.response && typeof interceptor.response === 'function') {
          return interceptor.response(response);
        }
        return Promise.reject(response.data);
        // return response.data;
        // return Promise.reject(response.data);
      } else {
        console.log((response.data && response.data.message) || 'Oops Something wrong');
        return Promise.reject(response.data);
      }
    },
    error => {
      if (error.response.status >= 500) {
        //handle sentry
      }
      return Promise.reject(error);
    },
  );

  if (params) {
    Object.keys(params).forEach(item => {
      if (item && (params[item] === undefined || params[item] === null)) {
        delete params[item];
      }
    });
  }

  return instance({
    method,
    url,
    params: method && params,
    data: method === 'post' && params,
  });
};
export default request;
