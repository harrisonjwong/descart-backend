import { Product } from '@backend/data';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
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
  @Get()
  getProducts() {
    return this.productService.getProducts();
  }

  @Get(':id')
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

  // @Get('/search')
  // searchProductsByName(@Body() searchTerm: ProductSearchDto) {
  //   console.log(searchTerm);
  //   const foundProducts: Product[] = this.productService.getProductByName(
  //     searchTerm.searchName
  //   );
  //   return foundProducts;
  // }
}
