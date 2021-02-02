import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReceiptService } from './receipt/receipt.service';
import { AuthController, AuthModule } from '@backend/auth';

@Module({
  imports: [AuthModule],
  controllers: [AppController, AuthController],
  providers: [AppService, ReceiptService],
})
export class AppModule {}
