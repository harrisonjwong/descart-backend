import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { ReceiptService } from './receipt/receipt.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly receiptService: ReceiptService
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('/receipts')
  getReceipts() {
    return this.receiptService.getReceipts();
  }
}
