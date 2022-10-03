export function TestFallback({ error, resetErrorBoundary }) {
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
