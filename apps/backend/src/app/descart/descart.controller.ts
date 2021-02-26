import { Controller, Get, Param, Query } from '@nestjs/common';
import { Product } from '../entities/Product';
import { Purchase } from '../entities/Purchase';
import { Purchaseproduct } from '../entities/Purchaseproduct';
import { DescartService } from './descart.service';

@Controller('descart')
export class DescartController {
  constructor(private descartService: DescartService) {}

  @Get('/purchases/:userId')
  async getPurchasesByUser(@Param('userId') id: string) {
    const p: Purchase[] = await this.descartService.findAllPurchasesByUserId(
      id
    );
    return p;
  }

  @Get('/purchasepreview/:purchaseId')
  async getPurchaseProductByPurchaseId(@Param('purchaseId') id: string) {
    const p: Purchaseproduct = await this.descartService.getPurchaseProductByPurchaseId(
      id
    );
    return p;
  }

  @Get('/productpreview/:productId')
  async getProductPreviewByProductId(@Param('productId') id: string) {
    const p: Product[] = await this.descartService.getProductsByProductId(id);
    return p;
  }

  @Get('/discover/:userId')
  async getDiscoverProductsByUserId(
    @Param('userId') userId: string,
    @Query('favorite') favorite: string,
    @Query('page') page: string
  ) {
    const p: Product[] = await this.descartService.getDiscoverProductsByUserId(
      userId,
      favorite,
      page
    );
    return p;
  }
}
