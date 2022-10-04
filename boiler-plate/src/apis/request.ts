import axiosClient, { AxiosError, AxiosInterceptorManager, AxiosResponse } from 'axios';
import type { AxiosRequestConfig, AxiosRequestHeaders, AxiosInstance } from 'axios';
import { ApiError, API_DOMAIN } from './config';
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
  // validateStatus: function (status) {
  //   return status < 500;
  // },
};

interface RequestParams {
  url: string;
  method?: 'get' | 'post';
  data?: Record<string, unknown>;
  config?: AxiosRequestConfig;
  specificInterceptor?: {
    request?: (config: AxiosRequestConfig) => void;
    response?: (response: ResponseData) => void;
  };
}

/**
 * @author kich555
 * @link https://blog.liufashi.top/2022/05/21/ts-axios/
 * @description 위 링크를 기반으로 조금씩 손본 custom request입니다.
 * 
 * 구체적으로 타입을 보다 더 구체화하였고, 나만의 custom 타입, 로직들을 추가하였습니다. 
 * 
 * 긴 명령형 구조인게 마음에 들진 않지만, 현재까지는 특별한 개선방안이 떠오르지 않습니다 
 * 
 * 타입 구체화 등 리팩토링 할 부분들이 남아있으나, 
 * 초기 기획과 구현은 끝났음으로 현재 버전을 초안으로 결정합니다.
 *
 */
const request = ({ method, url, data, config, specificInterceptor }: RequestParams): any => {
  const finalConfig: RequestConfig = { ...defaultConfig, ...config };
  const instance: AxiosInstance = axiosClient.create(finalConfig);

  instance.interceptors.request.use(config => {
    if (specificInterceptor?.request && typeof specificInterceptor.request === 'function') {
      return specificInterceptor.request(config);
    }
    return config;
  });

  instance.interceptors.response.use(
    (response: AxiosResponse<ResponseData>): ResponseData | Promise<never> | void => {
      /**
      @author kich555
      @description 실질적인 업무레벨 api response에서는 row data를 따로 wrapping 할 ResponseData구조체가 있겠지만, 이 프로젝트에서 default tester 로 사용하고 있는 open source api에서는 row data를 바로 반환하므로 아래의 조건식을 주석처리 했다.
      if (response.status === 200 && response.data.success) 
       */

      if (response.status === 200) {
        if (specificInterceptor?.response && typeof specificInterceptor.response === 'function') {
          return specificInterceptor.response(response.data);
        }
        // return Promise.reject(new ApiError('this error was thrown by api', response.data));
        return response.data;
      } else {
        console.log((response.data && response.data.message) || 'Oops Something wrong');
        return Promise.reject(new ApiError('this error was thrown by api', response.data));
      }
    },
    (error: AxiosError) => {
      console.log('AxiosError-->', error.response?.status, error);
      return Promise.reject(error);
    },
  );

  if (data) {
    Object.keys(data).forEach(item => {
      if (item && (data[item] === undefined || data[item] === null)) {
        delete data[item];
      }
    });
  }

  return instance({
    method: method || 'get',
    url,
    data: method === 'post' && data,
  });
};
export default request;
