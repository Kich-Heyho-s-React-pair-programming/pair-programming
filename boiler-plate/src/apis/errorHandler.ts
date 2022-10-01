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

// export function axiosErrorHandler(callback: (err: IAxiosError | IStockError) => void) {
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
