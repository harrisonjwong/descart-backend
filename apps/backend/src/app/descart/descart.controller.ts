import { Controller, Get, Param } from '@nestjs/common';
import { Purchase } from '../entities/Purchase';
import { Purchaseproduct } from '../entities/Purchaseproduct';
import { DescartService } from './descart.service';

@Controller('descart')
export class DescartController {
  constructor(private descartService: DescartService) {}

  @Get('/purchases/:id')
  async getPurchasesByUser(@Param('id') id: string) {
    const p: Purchase[] = await this.descartService.findAllPurchasesByUserId(
      id
    );
    return p;
  }

  @Get('/purchasepreview/:id')
  async getPurchaseProductByPurchaseId(@Param('id') id: string) {
    const p: Purchaseproduct = await this.descartService.getPurchaseProductByPurchaseId(
      id
    );
    return p;
  }
}
