import { registerAs } from '@nestjs/config';
import { getEnv, getNumberEnv } from '@modix/pkgs/config';

export const appConfig = registerAs('app', () => ({
  name: 'auth-service',
  port: getNumberEnv('PORT', 3001),
  globalPrefix: getEnv('GLOBAL_PREFIX', 'auth')
}));
