import { Module } from '@nestjs/common';
import { HttpModule } from '../../shared/http/http.module';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';

@Module({
  imports: [HttpModule],
  controllers: [PaymentsController],
  providers: [PaymentsService]
})
export class PaymentsModule {}