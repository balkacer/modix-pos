import { registerAs } from '@nestjs/config';
import { getNumberEnv } from '@modix/pkgs/config';

export const appConfig = registerAs('app', () => ({
  name: 'sales-service',
  port: getNumberEnv('PORT', 3004)
}));
