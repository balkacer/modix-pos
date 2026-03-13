// pkgs/config/src/env/get-number-env.ts
import { getEnv } from './get-env';

export const getNumberEnv = (key: string, fallback?: number): number => {
  const rawValue = process.env[key] ?? fallback?.toString();

  if (!rawValue) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  const parsedValue = Number(rawValue);

  if (Number.isNaN(parsedValue)) {
    throw new Error(`Invalid numeric environment variable: ${key}`);
  }

  return parsedValue;
};