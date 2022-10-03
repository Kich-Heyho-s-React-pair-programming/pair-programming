import { AxiosPromise } from 'axios';
import request from './request';
// import request from 'apis/test';

export interface ResponseData<T = any> {
  code: number;
  data: T;
  message: string;
  success: true | false;
}

//for example
interface TodoData {
  completed: boolean;
  id: number;
  title: string;
  userId: string;
}

/**
@author kich555
@description axios async reeponse flow는 아래와 같이 구성되었음을 알림
Promise에 의해 반환되는 response는 아래와 같은 흐름으로 wrapping 되어있다.
AxiosResponse -> axios에서 제공하는 기본적인 response 구조체
ResponseData -> back-end developer에 의해 wrapping된 api response 구조체
SpecificData ->  UI or 실질적인 business logic에 영향을 끼치게 될 real data
*/
export const getTestRequestWithoutParams = async (): Promise<ResponseData<TodoData>> =>
  // throw new Error('9');
  // throw { type: 'unknown', test: 'this work?' };
  // throw 'test';
  request('get', `https://jsonplaceholder.typicode.com/todos/1`);

export const getTestRequestWithParams = async (id: string): Promise<ResponseData<TodoData>> => request('get', `https://jsonplaceholder.typicode.com/todos/${id}`);

// export const getWithoutParamsTestRequest: REQ<TodoRequestProps, TodoData> = id =>
//   request(
//     'get',
//     `https://jsonplaceholder.typicode.com/todos/${id}`,
//     {},
//     {
//       headers: {
//         'content-type': 'application/json',
//       },
//     },
//     {
//       request: (request: any) => {
//         // 处理请求
//         console.log(request);
//       },
//       response: (response: any) => {
//         // 处理响应
//         console.log(response);
//       },
//     },
//   );
