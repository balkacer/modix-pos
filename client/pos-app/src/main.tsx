import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { QueryClientAppProvider } from './app/providers/query-client.provider';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element with id "root" was not found.');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <QueryClientAppProvider>
      <App />
    </QueryClientAppProvider>
  </React.StrictMode>
);

