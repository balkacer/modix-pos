import { Module } from '@nestjs/common';
import { HttpModule } from '../../shared/http/http.module';
import { BusinessController } from './business.controller';
import { BusinessService } from './business.service';

@Module({
  imports: [HttpModule],
  controllers: [BusinessController],
  providers: [BusinessService]
})
export class BusinessModule {}