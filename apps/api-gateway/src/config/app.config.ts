import { registerAs } from '@nestjs/config';
import { getEnv, getNumberEnv } from '@modix/pkgs/config';

export const appConfig = registerAs('app', () => ({
  name: 'api-gateway',
  port: getNumberEnv('PORT', 3000),
  globalPrefix: getEnv('GLOBAL_PREFIX', 'api'),
  corsOrigins: getEnv('CORS_ORIGINS', '*')
    .split(',')
    .map((origin) => origin.trim()),
  services: {
    authServiceBaseUrl: getEnv('AUTH_SERVICE_BASE_URL', 'http://localhost:3001'),
    businessServiceBaseUrl: getEnv('BUSINESS_SERVICE_BASE_URL', 'http://localhost:3002'),
    catalogServiceBaseUrl: getEnv('CATALOG_SERVICE_BASE_URL', 'http://localhost:3003'),
    salesServiceBaseUrl: getEnv('SALES_SERVICE_BASE_URL', 'http://localhost:3004'),
    paymentServiceBaseUrl: getEnv('PAYMENT_SERVICE_BASE_URL', 'http://localhost:3005')
  }
}));
