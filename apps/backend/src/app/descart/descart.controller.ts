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
import { ShoppingCartItemDto } from './dto/shoppingcartitem.dto';

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
    return p.map((purchase) => {
      purchase['purchaseDate'] = moment(purchase['purchaseDate']).format(
        'MM/DD/yyyy'
      );
      return purchase;
    });
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Get('/productpreview/:productId')
  async getProductPreviewByProductId(@Param('productId') id: string) {
    const p: Product[] = await this.descartService.getProductsByProductId(id);
    return p;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/discover')
  async getDiscoverProductsByUserId(
    @Request() req,
    @Query('search') search: string,
    @Query('favorite') favorite: string,
    @Query('page_size') pageSize: string,
    @Query('page') page: string
  ) {
    const p: Product[] = await this.descartService.getDiscoverProductsByUserId(
      req.user.userId,
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

  @UseGuards(JwtAuthGuard)
  @Delete('/purchase/:purchaseId')
  async deletePurchase(@Param('purchaseId') purchaseId: string) {
    return await this.descartService.deletePurchase(purchaseId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/purchase')
  async createPurchase(@Request() req, @Body() body: CreatePurchaseDto) {
    const p: Purchase = await this.descartService.createPurchase(
      req.user.userId,
      body
    );
    p['purchaseDate'] = moment(p['purchaseDate']).format('MM/DD/yyyy');
    return p;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/favoriteproduct')
  async favoriteProduct(@Request() req, @Body() body: FavoriteProductDto) {
    return await this.descartService.addOrRemoveFavoriteProducts(
      req.user.userId,
      body
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('/favoritepurchase')
  async favoritePurchase(@Request() req, @Body() body: FavoritePurchaseDto) {
    return await this.descartService.addOrRemoveFavoritePurchases(
      req.user.userId,
      body
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/shoppingcart')
  async getShoppingCartForUser(@Request() req) {
    return await this.descartService.getShoppingCartForUser(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/shoppingcart')
  async addOrRemoveShoppingCartItem(
    @Request() req,
    @Body() body: ShoppingCartItemDto
  ) {
    return await this.descartService.addOrRemoveShoppingCartItem(
      req.user.userId,
      body
    );
  }
}
