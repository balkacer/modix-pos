import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.string().optional(),
  CORS_ORIGINS: z.string().default('*'),
  PORT: z.coerce.number().default(3000),
  GLOBAL_PREFIX: z.string().default('api'),
  AUTH_SERVICE_BASE_URL: z.string().default('http://localhost:3001'),
  BUSINESS_SERVICE_BASE_URL: z.string().default('http://localhost:3002'),
  CATALOG_SERVICE_BASE_URL: z.string().default('http://localhost:3003'),
  SALES_SERVICE_BASE_URL: z.string().default('http://localhost:3004'),
  PAYMENT_SERVICE_BASE_URL: z.string().default('http://localhost:3005')
});

export type EnvSchema = z.infer<typeof envSchema>;
