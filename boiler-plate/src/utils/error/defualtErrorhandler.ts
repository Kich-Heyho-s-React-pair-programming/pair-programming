import axios, { AxiosError } from 'axios';
import { ResponseData } from 'apis';

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
interface IResponedError {
  error: ResponseData;
  type: 'server-error';
}

export type COMMON_ERROR = Error | AxiosError | ErrorWithMessage | ResponseData;
export type TYPED_ERROR = IAxiosError | IStockError | IUnknownError | IResponedError;

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
 *
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
 * @param error
 * @returns {ErrorWithMessage}
 */
function toErrorWithMessage(error: unknown): ErrorWithMessage {
  if (isErrorWithMessage(error)) {
    console.log('isin?');
    return error;
  }
  try {
    console.log('isin??');
    return new Error(JSON.stringify(error));
  } catch {
    console.log('isin???');
    return new Error(String(error));
  }
}

function errorTypeHandler(error: ErrorWithMessage): TYPED_ERROR {
  if (axios.isAxiosError(error)) {
    return {
      error: error,
      type: 'axios-error',
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

function getErrorMessage(error: unknown) {
  const processedError = toErrorWithMessage(error);
  console.log('processedError', processedError);
  return processedError.message;
}

/**
    @author kich555
    @description defualtErrorhandler() 에서는 custom request에서 필터링 된 에러 (http status 500 미만 에러들) 을 인자로 받아 기본적인 에러 핸들링을 시작합니다.) 
       */
export default function defualtErrorhandler(error: unknown, info: { componentStack: string }) {
  console.log('info', info);
  const errorWithMessage = toErrorWithMessage(error);
  const typedError = errorTypeHandler(errorWithMessage);
  // error 가 아닌 것을 걸러내기 위한 타입가드
  console.log('error->', typedError.error.message, typedError.type);
  // axiosError인지 stockError에러인지 걸러내기 위한 타입가드

  if (typedError.type === 'axios-error') {
    return console.log("It's axios error");
  } else {
    return console.log("It's not axios error");
  }
}
