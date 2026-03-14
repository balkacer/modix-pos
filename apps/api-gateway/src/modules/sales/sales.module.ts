import { Module } from '@nestjs/common';
import { HttpModule } from '../../shared/http/http.module';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';

@Module({
  imports: [HttpModule],
  controllers: [SalesController],
  providers: [SalesService]
})
export class SalesModule {}