import { FavoriteProduct } from '@backend/data';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from 'libs/auth/src/lib/jwt-auth.guard';
import { FavoriteProductService } from './favorite-product.service';

@Controller('favoriteProduct')
export class FavoriteProductController {
  constructor(private favoriteProductService: FavoriteProductService) {}

  // @UseGuards(JwtAuthGuard)
  @Get('/all')
  getFavoriteProducts() {
    return this.favoriteProductService.getFavoriteProducts();
  }

  @Get('/id/:id')
  getFavoriteProductById(@Param('id') id: string) {
    const found: FavoriteProduct = this.favoriteProductService.getFavoriteProductById(
      id
    );
    if (!found) {
      throw new HttpException(
        'id has no favorite product associated',
        HttpStatus.NOT_FOUND
      );
    }
    return found;
  }

  @Get('/user/:id')
  getAllFavoriteProductsByUserId(@Param('id') id: string) {
    const found: FavoriteProduct[] = this.favoriteProductService.getAllFavoritesByUserId(
      id
    );
    if (!found || found.length === 0) {
      throw new HttpException(
        'user id has no favorite products associated',
        HttpStatus.NOT_FOUND
      );
    }
    return found;
  }
}
