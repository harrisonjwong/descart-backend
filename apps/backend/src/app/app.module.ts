import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReceiptService } from './receipt/receipt.service';
import { AuthModule } from '@backend/auth';

@Module({
  imports: [AuthModule],
  controllers: [AppController],
  providers: [AppService, ReceiptService],
})
export class AppModule {}
