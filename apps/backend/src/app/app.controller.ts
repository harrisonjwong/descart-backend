import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

import { AppService } from './app.service';
import { ReceiptService } from './receipt/receipt.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly receiptService: ReceiptService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getData() {
    return this.appService.getData();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/receipts')
  getReceipts() {
    return this.receiptService.getReceipts();
  }
}
