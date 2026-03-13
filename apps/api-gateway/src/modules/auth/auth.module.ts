import { Module } from '@nestjs/common';
import { HttpModule } from '../../shared/http/http.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [HttpModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}