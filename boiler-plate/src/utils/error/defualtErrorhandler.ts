import axios, { AxiosError } from 'axios';
import { ResponseData } from 'apis';
import { ApiError } from 'apis/config';

interface ErrorWithMessage {
  message: string;
}

interface IAxiosError {
  error: AxiosError;
  type: 'axios-error';
}
interface IStockError {
  error: Error;
  type: 'stock-error';
}
interface IUnknownError {
  error: ErrorWithMessage;
  type: 'unknown-error';
}
interface IResponseError {
  error: ApiError;
  type: 'api-throw-error';
}

export type COMMON_ERROR = Error | AxiosError | ErrorWithMessage | ApiError;
export type TYPED_ERROR = IAxiosError | IStockError | IUnknownError | IResponseError;

/**
 * @author kich555
 * @link https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
 * @link https://github.com/kentcdodds/kentcdodds.com/issues/206
 * @description 아래 함수는 kentcdodds의 블로그를 참조하였습니다.
 *
 * catch 구문은 throw된 어떤 것이든 잡아낼 수 있습니다.
 *
 * 언제나 정상적인 Error Instance가 올 것이라고 낙관할 수 없습니다.
 *
 * 객체에 message 프로퍼티가 존재하며 message type이 string인지 확인하는 함수입니다.
 * @param {unknown} error
 * @returns {boolean} isErrorWithMessage
 */
function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return typeof error === 'object' && error !== null && 'message' in error && typeof (error as Record<string, unknown>).message === 'string';
}

/**
 * @author kich555
 * @description 아래 함수는 kentcdodds의 블로그를 참조하였습니다.
 *
 * 반환되는 객체가 무조건 message 프로퍼티를 가질 수 있도록
 * 하는 함수입니다.
 *
 * 주의하세요 ! 반환되는 객체의 타입이 Error임을 보장할 수 없습니다 !
 *
 * @link https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
 * @link https://github.com/kentcdodds/kentcdodds.com/issues/206
 * @param {unknown} error
 * @returns {ErrorWithMessage} hasMessageError
 */
function toErrorWithMessage(error: unknown): ErrorWithMessage {
  if (isErrorWithMessage(error)) {
    console.log('This is common error');
    return error;
  }
  try {
    console.log('This is Stringified error');
    return new Error(JSON.stringify(error));
  } catch {
    console.log('This is not Stringified error');
    return new Error(String(error));
  }
}

/**
 * @author kich555
 * @description 에러의 type을 나누고 좁히는 역할을 합니다.
 *
 * 에러의 타입은 크게 4가지로 나누어집니다.
 * @link https://github.com/axios/axios/issues/3612
 * @param {ErrorWithMessage} error
 * @return {TYPED_ERROR} AxiosError | ApiError | Error | Unknown
 */
function errorTypeHandler(error: ErrorWithMessage): TYPED_ERROR {
  if (axios.isAxiosError(error)) {
    return {
      error: error,
      type: 'axios-error',
    };
  }
  if (error instanceof ApiError) {
    return {
      error: error,
      type: 'api-throw-error',
    };
  }
  if (error instanceof Error) {
    return {
      error: error,
      type: 'stock-error',
    };
  }
  return {
    error: error,
    type: 'unknown-error',
  };
}

/**
 * @author kich555
 * @description 에러 메세지를 반환합니다.
 * @param {unknown} error
 * @return {string} message
 */
function getErrorMessage(error: unknown) {
  const processedError = toErrorWithMessage(error);
  console.log('processedError', processedError);
  return processedError.message;
}

/**
 * @author kich555
 * @description 기본 에러 핸들러입니다. 
 * 결과적으로 message가 있는, type에 따라 formatting된 Custom error 객체를 반환합니디.
 * @param {unknown} error
 * @return {string} message
 */
export default function defualtErrorhandler(error: unknown) {
  // 에러를 예상 가능한 포멧으로 변경
  const errorWithMessage = toErrorWithMessage(error);
  // 에러 타입 구체화
  const typedError = errorTypeHandler(errorWithMessage);
  const { error: specificError, type } = typedError;

  // // 에러 타입에 따른 타입가드
  // if (type === 'axios-error') {
  //   console.log('test', specificError.response?.status);
  //   return console.log("It's axios error");
  // }
  // if (type === 'api-throw-error') {
  //   return console.log("It's api error");
  // }
  // if (type === 'stock-error') {
  //   return console.log("It's stock error", specificError);
  // }
  // if (type === 'unknown-error') {
  //   return console.log("It's unknown error");
  // }
  return typedError;
}
