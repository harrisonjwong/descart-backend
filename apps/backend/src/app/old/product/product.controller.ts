import { Product } from '@backend/data';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from 'libs/auth/src/lib/jwt-auth.guard';
import { ProductService } from './product.service';

export class ProductSearchDto {
  searchName: string;
}

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  // @UseGuards(JwtAuthGuard)
  @Get('/all')
  getProducts() {
    return this.productService.getProducts();
  }

  @Get('/id/:id')
  getProductById(@Param('id') id: string) {
    const foundProduct: Product = this.productService.getProductById(id);
    if (!foundProduct) {
      throw new HttpException(
        'Product id has no product associated',
        HttpStatus.NOT_FOUND
      );
    }
    return foundProduct;
  }

  @Get('/nameSearch')
  searchProductsByName(@Query('name') name) {
    if (name) {
      const foundProducts: Product[] = this.productService.getProductByName(
        name
      );
      return foundProducts;
    } else {
      throw new HttpException(
        `No product found with name ${name}`,
        HttpStatus.NOT_FOUND
      );
    }
  }
}
