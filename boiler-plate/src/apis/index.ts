import { AxiosPromise } from 'axios';
import request from './request';
interface ResponseData<T> {
  code: number;
  data: T;
  message: string;
  success: true | false;
}

//for example
interface UserInfo {
  username?: '';
}
interface TestProps {
  userId?: string;
}

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
export const getWithoutParamsTestRequest = (): AxiosPromise<ResponseData<TodoData>> => request('get', 'https://jsonplaceholder.typicode.com/todos/1');

// export const testRequest = (params: TestProps = {}): AxiosPromise<ResponseData<UserInfo>> => request('post', 'https://api.themoviedb.org/3/movie/550?api_key=edd2f4791601915cc3444664865aae15', params);

// 'https://api.themoviedb.org/3/movie/popular?api_key=edd2f4791601915cc3444664865aae15'
