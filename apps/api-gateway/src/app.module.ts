import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './config/app.config';
import { AuthModule } from './modules/auth/auth.module';
import { BusinessModule } from './modules/business/business.module';
import { HealthModule } from './modules/health/health.module';
import { HttpModule } from './shared/http/http.module';
import { CatalogModule } from './modules/catalog/catalog.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig]
    }),
    HttpModule,
    HealthModule,
    AuthModule,
    BusinessModule,
    CatalogModule,
  ]
})
export class AppModule { }