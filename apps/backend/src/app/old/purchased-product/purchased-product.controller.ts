import { PurchasedProduct } from '@backend/data';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from 'libs/auth/src/lib/jwt-auth.guard';
import { PurchasedProductService } from './purchased-product.service';

@Controller('purchasedProduct')
export class PurchasedProductController {
  constructor(private purchasedProductService: PurchasedProductService) {}

  // @UseGuards(JwtAuthGuard)
  @Get('/all')
  getProducts() {
    return this.purchasedProductService.getPurchasedProducts();
  }

  @Get('/id/:id')
  getProductById(@Param('id') id: string) {
    const found: PurchasedProduct = this.purchasedProductService.getPurchasedProductById(
      id
    );
    if (!found) {
      throw new HttpException(
        'id has no purchased product associated',
        HttpStatus.NOT_FOUND
      );
    }
    return found;
  }
}
