import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { QueryClientAppProvider } from './app/providers/query-client.provider';
import { SessionHydrator } from './app/providers/session-hydrator';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element with id "root" was not found.');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <QueryClientAppProvider>
      <SessionHydrator />
      <App />
    </QueryClientAppProvider>
  </React.StrictMode>
);

