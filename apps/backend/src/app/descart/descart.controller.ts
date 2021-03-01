import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { Product } from '../entities/Product';
import { Purchase } from '../entities/Purchase';
import { Purchasecustomproduct } from '../entities/Purchasecustomproduct';
import { Purchaseproduct } from '../entities/Purchaseproduct';
import { DescartService } from './descart.service';
import { AutocompleteDto } from './dto/autocomplete.dto';
import { CreatePurchaseDto } from './dto/createpurchase.dto';

@Controller('descart')
export class DescartController {
  constructor(private descartService: DescartService) {}

  @Get('/purchases/:userId')
  async getPurchasesByUser(
    @Param('userId') id: string,
    @Query('search') search: string,
    @Query('favorite') favorite: string,
    @Query('page') page: string
  ) {
    console.log(search, favorite);
    const p: Purchase[] = await this.descartService.findAllPurchasesByUserId(
      id, search, favorite, page
    );
    return p;
  }

  @Get('/purchasepreview/:purchaseId')
  async getPurchaseProductByPurchaseId(@Param('purchaseId') id: string) {
    const purchaseProducts: Purchaseproduct[] = await this.descartService.getPurchaseProductsByPurchaseId(
      id
    );
    const purchaseCustomProducts: Purchasecustomproduct[] = await this.descartService.getPurchaseCustomProductsByPurchaseId(
      id
    );
    let toReturn = [].concat(purchaseProducts).concat(purchaseCustomProducts).sort((a, b) => a["index"] - b["index"]);
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
    @Query('page') page: string
  ) {
    const p: Product[] = await this.descartService.getDiscoverProductsByUserId(
      userId,
      search,
      favorite,
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
    return await this.descartService.createPurchase(body);
  }
}
