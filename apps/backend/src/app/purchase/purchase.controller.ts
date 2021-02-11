import { Purchase } from '@backend/data';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from 'libs/auth/src/lib/jwt-auth.guard';
import { PurchaseService } from './purchase.service';

@Controller('purchase')
export class PurchaseController {
  constructor(private purchaseService: PurchaseService) {}

  // @UseGuards(JwtAuthGuard)
  @Get('/all')
  getPurchases() {
    return this.purchaseService.getPurchases();
  }

  @Get('/id/:id')
  getPurchaseById(@Param('id') id: string) {
    const found: Purchase = this.purchaseService.getPurchaseById(id);
    if (!found) {
      throw new HttpException(
        'id has no purchase associated',
        HttpStatus.NOT_FOUND
      );
    }
    return found;
  }
}
