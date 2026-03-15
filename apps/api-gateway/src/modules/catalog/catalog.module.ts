import { Module } from '@nestjs/common';
import { HttpModule } from '../../shared/http/http.module';
import { CatalogController } from './catalog.controller';
import { CatalogService } from './catalog.service';

@Module({
  imports: [HttpModule],
  controllers: [CatalogController],
  providers: [CatalogService]
})
export class CatalogModule {}
