import { TYPED_ERROR } from 'utils/error/defualtErrorhandler';

interface DefaultFallbackProps {
  error: any;
  resetErrorBoundary: (...args: Array<unknown>) => void;
}

export function TestFallback({ error, resetErrorBoundary }: DefaultFallbackProps) {
  console.log('error in fall back-->', error);
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

export function TestSuspense() {
  return (
    <div role="alert">
      <p>loading...</p>
      <pre>network loading...</pre>
    </div>
  );
}
