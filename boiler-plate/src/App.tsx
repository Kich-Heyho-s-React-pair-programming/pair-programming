import { ErrorBoundary } from 'react-error-boundary';
import { QueryErrorResetBoundary } from 'react-query';
import { Suspense } from 'react';
import Home from 'pages/Home';
import { TestFallback, TestSuspense } from 'pages/Error/DefaultFallback';
import defualtErrorhandler from 'utils/error/defualtErrorhandler';

export default function App() {
  return (
    <div>
      <h1>{"It's safe"}</h1>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary FallbackComponent={TestFallback} onError={defualtErrorhandler} onReset={reset}>
            <Suspense fallback={<TestSuspense />}>
              <Home />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </div>
  );
}
