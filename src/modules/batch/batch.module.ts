import { Module } from '@nestjs/common';
import { BatchService } from './batch.service';

@Module({
  providers: [BatchService],
  exports: [BatchService],
})
export class BatchModule {}
