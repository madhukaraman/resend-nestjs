import { Module } from '@nestjs/common';
import { AudiencesService } from './audiences.service';

@Module({
  providers: [AudiencesService],
  exports: [AudiencesService],
})
export class AudiencesModule {}
