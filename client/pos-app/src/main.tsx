import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import { QueryClientAppProvider } from './app/providers/query-client.provider';
import { SessionHydrator } from './app/providers/session-hydrator';
import { ShiftRestorer } from './app/providers/shift-restorer';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element with id "root" was not found.');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <QueryClientAppProvider>
      <SessionHydrator />
      <ShiftRestorer />
      <App />
    </QueryClientAppProvider>
  </React.StrictMode>
);
