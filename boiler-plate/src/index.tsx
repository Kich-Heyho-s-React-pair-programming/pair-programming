import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NotificationsProvider } from '@mantine/notifications';
import { MantineProvider } from '@mantine/core';
import App from './App';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('kich') as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <NotificationsProvider>
            <App />
          </NotificationsProvider>
        </MantineProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
