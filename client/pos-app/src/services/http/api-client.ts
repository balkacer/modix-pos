import axios from 'axios';
import { env } from '../../shared/config/env';
import { sessionStorageService } from '../../shared/storage/session-storage.service';
import { clearClientSession } from '../../shared/auth/clear-client-session';
import { useAppUiStore } from '../../shared/store/app-ui.store';

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.request.use((config) => {
  const accessToken = sessionStorageService.getAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const statusCode = error?.response?.status;

    if (statusCode === 401) {
      clearClientSession();
      useAppUiStore
        .getState()
        .setGlobalMessage('Your session is no longer valid. Please log in again.');
    } else if (statusCode === 403) {
      useAppUiStore
        .getState()
        .setGlobalMessage('You do not have permission to perform this action.');
    }

    return Promise.reject(error);
  }
);
