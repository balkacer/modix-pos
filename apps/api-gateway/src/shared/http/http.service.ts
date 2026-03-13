import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

@Injectable()
export class HttpService {
  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      timeout: 10000
    });
  }

  async get<TResponse>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<TResponse>> {
    return this.client.get<TResponse>(url, config);
  }

  async post<TResponse, TPayload = unknown>(
    url: string,
    payload?: TPayload,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<TResponse>> {
    return this.client.post<TResponse>(url, payload, config);
  }

  async patch<TResponse, TPayload = unknown>(
    url: string,
    payload?: TPayload,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<TResponse>> {
    return this.client.patch<TResponse>(url, payload, config);
  }

  async delete<TResponse>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<TResponse>> {
    return this.client.delete<TResponse>(url, config);
  }
}