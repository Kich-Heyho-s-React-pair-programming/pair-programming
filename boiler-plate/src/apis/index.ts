import { AxiosPromise } from 'axios';
import request from './request';
interface ResponseData<T> {
  code: number;
  data: T;
  message: string;
  success: true | false;
}

//eggs:
interface UserInfo {
  username?: '';
}
interface TestProps {
  userId?: string;
}
export const testRequest = (params: TestProps = {}): AxiosPromise<ResponseData<UserInfo>> => request('post', 'https://api.themoviedb.org/3/movie/550?api_key=edd2f4791601915cc3444664865aae15', params);

// 'https://api.themoviedb.org/3/movie/popular?api_key=edd2f4791601915cc3444664865aae15'
