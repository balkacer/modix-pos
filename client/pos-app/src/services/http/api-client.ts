import axios from 'axios';
import { env } from '../../shared/config/env';
import { sessionStorageService } from '../../shared/storage/session-storage.service';

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