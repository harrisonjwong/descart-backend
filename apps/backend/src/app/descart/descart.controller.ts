import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Product } from '../entities/Product';
import { Purchase } from '../entities/Purchase';
import { Purchasecustomproduct } from '../entities/Purchasecustomproduct';
import { Purchaseproduct } from '../entities/Purchaseproduct';
import { DescartService } from './descart.service';
import { CreatePurchaseDto } from './dto/createpurchase.dto';
import { FavoriteProductDto } from './dto/favoriteproduct.dto';
import { FavoritePurchaseDto } from './dto/favoritepurchase.dto';
import * as moment from 'moment';

@Controller('descart')
export class DescartController {
  constructor(private descartService: DescartService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/purchases')
  async getPurchasesByUser(
    @Request() req,
    @Query('search') search: string,
    @Query('favorite') favorite: string,
    @Query('sort') sort: string,
    @Query('page_size') pageSize: string,
    @Query('page') page: string
  ) {
    const userIdFromJwt = req.user.userId;
    const p: Purchase[] = await this.descartService.findAllPurchasesByUserId(
      userIdFromJwt,
      search,
      favorite,
      sort,
      pageSize,
      page
    );
    return p;
  }

  @Get('/purchases/:userId')
  async getPurchasesByUserId(
    @Param('userId') id: string,
    @Query('search') search: string,
    @Query('favorite') favorite: string,
    @Query('sort') sort: string,
    @Query('page_size') pageSize: string,
    @Query('page') page: string
  ) {
    const p: Purchase[] = await this.descartService.findAllPurchasesByUserId(
      id,
      search,
      favorite,
      sort,
      pageSize,
      page
    );
    return p.map((purchase) => {
      purchase['purchaseDate'] = moment(purchase['purchaseDate']).format(
        'MM/DD/yyyy'
      );
      return purchase;
    });
  }

  @Get('/purchasepreview/:purchaseId')
  async getPurchaseProductByPurchaseId(@Param('purchaseId') id: string) {
    const purchaseProducts: Purchaseproduct[] = await this.descartService.getPurchaseProductsByPurchaseId(
      '1',
      id
    );
    const purchaseCustomProducts: Purchasecustomproduct[] = await this.descartService.getPurchaseCustomProductsByPurchaseId(
      id
    );
    let toReturn = []
      .concat(purchaseProducts)
      .concat(purchaseCustomProducts)
      .sort((a, b) => a['index'] - b['index']);
    console.log(purchaseProducts, purchaseCustomProducts, toReturn);

    return toReturn;
  }

  @Get('/productpreview/:productId')
  async getProductPreviewByProductId(@Param('productId') id: string) {
    const p: Product[] = await this.descartService.getProductsByProductId(id);
    return p;
  }

  @Get('/discover/:userId')
  async getDiscoverProductsByUserId(
    @Param('userId') userId: string,
    @Query('search') search: string,
    @Query('favorite') favorite: string,
    @Query('page_size') pageSize: string,
    @Query('page') page: string
  ) {
    const p: Product[] = await this.descartService.getDiscoverProductsByUserId(
      userId,
      search,
      favorite,
      pageSize,
      page
    );
    return p;
  }

  @Get('/autocomplete/store')
  async getSimilarStoreNames(@Query('query') query: string) {
    return await this.descartService.getSimilarStoreNames(query);
  }

  @Get('/autocomplete/product')
  async getSimilarProductNames(@Query('query') query: string) {
    return await this.descartService.getSimilarProductNames(query);
  }

  @Delete('/purchase/:purchaseId')
  async deletePurchase(@Param('purchaseId') purchaseId: string) {
    return await this.descartService.deletePurchase(purchaseId);
  }

  @Post('/purchase')
  async createPurchase(@Body() body: CreatePurchaseDto) {
    const p: Purchase = await this.descartService.createPurchase(body);
    p['purchaseDate'] = moment(p['purchaseDate']).format('MM/DD/yyyy');
    return p;
  }

  @Post('/favoriteproduct')
  async favoriteProduct(@Body() body: FavoriteProductDto) {
    return await this.descartService.addOrRemoveFavoriteProducts(body);
  }

  @Post('/favoritepurchase')
  async favoritePurchase(@Body() body: FavoritePurchaseDto) {
    return await this.descartService.addOrRemoveFavoritePurchases(body);
  }
}
