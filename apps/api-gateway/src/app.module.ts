import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './config/app.config';
import { AuthModule } from './modules/auth/auth.module';
import { BusinessModule } from './modules/business/business.module';
import { HealthModule } from './modules/health/health.module';
import { HttpModule } from './shared/http/http.module';
import { CatalogModule } from './modules/catalog/catalog.module';
import { SalesModule } from './modules/sales/sales.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { AuthzModule } from './modules/authz/authz.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig]
    }),
    HttpModule,
    AuthzModule,
    HealthModule,
    AuthModule,
    BusinessModule,
    CatalogModule,
    SalesModule,
    PaymentsModule
  ]
})
export class AppModule {}
