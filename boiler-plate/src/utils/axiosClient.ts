import axios, { AxiosError, AxiosResponse } from 'axios';
import { cloneDeep } from './utils';

const { REACT_APP_BASE_URL, REACT_APP_AUTHORIZATION } = process.env;
const client = axios.create({ baseURL: REACT_APP_BASE_URL });

export const request = ({ ...options }) => {
  //   client.defaults.headers.common.Authorization = REACT_APP_AUTHORIZATION;
  const onSuccess = (value: AxiosResponse<any, any>) => value;
  const onError = (error: AxiosError) => error;
  return client(options).then(onSuccess).catch(onError);
};

// .catch((err: Error | AxiosError) {
//     if (axios.isAxiosError(error))  {
//       // Access to config, request, and response
//     } else {
//       // Just a stock error
//     }
//   })

interface FetchData {
  methods: 'get' | 'post' | 'put';
  url: string;
  params?: unknown;
  callback: (result: AxiosResponse) => void;
}

export async function fetchData<Response>({ methods = 'get', url, params, callback }: FetchData): Promise<any> {
  let result: AxiosResponse;
  let res: Response;

  try {
    switch (methods) {
      case 'get':
        res = await client.get(url);
        if (res) {
          result = cloneDeep(res);
          return callback(result);
        }
        return;
      case 'post':
        res = await client.post(url, params);
        if (res) {
          result = cloneDeep(res);
          return callback(result);
        }
        return;
      case 'put':
        res = await client.put(url, params);
        if (res) {
          result = cloneDeep(res);
          return callback(result);
        }
        return;
      default:
        break;
    }
  } catch (error) {
    errorHandler(error);
  }
}

export const errorHandler = (error: unknown) => {
  let message = 'Unknown Error';
  if (error instanceof AxiosError) {
    message = error.response?.data.message;
    if (error.response?.data?.status === 401) {
      (window as any).location = '/auth';
      localStorage.removeItem('user');
      // return alert('권한이 없습니다. 다시 로그인해주세요.');
    }
  }

  return alert(message);
};
