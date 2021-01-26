import { Injectable } from '@nestjs/common';

import { Receipt } from '@backend/data';

const receipts: Receipt[] = [
  { message: 'hi', date: 'today' },
  { message: 'nx', date: 'today' },
];

@Injectable()
export class ReceiptService {
  getReceipts(): Receipt[] {
    return receipts;
  }
}
