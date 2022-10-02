import axios, { AxiosError } from 'axios';

interface IAxiosError {
  error: AxiosError;
  type: 'axios-error';
}
interface IStockError {
  error: Error;
  type: 'stock-error';
}

export type COMMON_ERROR = Error | AxiosError;

/**
@author kich555
@link https://github.com/axios/axios/issues/3612
@link https://github.com/axios/axios/issues/3612#issuecomment-893017210
@description custom axios request에서 throw될 error의 type이 AxiosError 인지 필터링 하는 함수입니다. 위 링크에서 보여준 레퍼런스를 그대로 차용해 사용해 보았지만, 개인적인 생각에 코드가 직관적이지 않고 명령형으로 흐르는 느낌이 있어 일단 주석처리를 해 두었다.
(내 기준에 안이쁨)
*/
// export function axiosErrorHandlerByCallback(callback: (err: IAxiosError | IStockError) => void) {
//   return (error: Error | AxiosError) => {
//     if (axios.isAxiosError(error)) {
//       callback({
//         error,
//         type: 'axios-error',
//       });
//     } else {
//       callback({
//         error,
//         type: 'stock-error',
//       });
//     }
//   };
// }
/**
@author kich555
@link https://github.com/axios/axios/issues/3612
@link https://github.com/axios/axios/issues/3612#issuecomment-893017210
@description 위 주석처리된 axiosErrorHandlerByCallback이 마음에 들지 않아 
위 링크를 참고해 다시 만든 axiosErrorHandler. 인자로 받는 error를 

*/
export function axiosErrorHandler(error: COMMON_ERROR): IAxiosError | IStockError {
  if (axios.isAxiosError(error)) {
    return {
      error: error,
      type: 'axios-error',
    };
  } else {
    return {
      error: error,
      type: 'stock-error',
    };
  }
}
