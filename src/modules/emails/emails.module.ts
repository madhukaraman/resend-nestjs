import { Module } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { ResendModule } from '@/resend.module';

@Module({
  imports: [ResendModule],
  providers: [EmailsService],
  exports: [EmailsService],
})
export class EmailsModule {}
