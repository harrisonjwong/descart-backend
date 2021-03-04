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
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Product } from '../entities/Product';
import { Purchase } from '../entities/Purchase';
import { Purchaseproduct } from '../entities/Purchaseproduct';
import { DescartService } from './descart.service';
import { AutocompleteDto } from './dto/autocomplete.dto';
import { CreatePurchaseDto } from './dto/createpurchase.dto';

@Controller('descart')
export class DescartController {
  constructor(private descartService: DescartService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/purchases')
  async getPurchasesByUser(@Request() req, @Param('userId') id: string) {
    const userIdFromJwt = req.user.userId;
    const p: Purchase[] = await this.descartService.findAllPurchasesByUserId(
      userIdFromJwt
    );
    return p;
  }

  @Get('/purchases/:userId')
  async getPurchasesByUserPassId(@Param('userId') id: string) {
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

  @Get('/autocomplete/store')
  async getSimilarStoreNames(@Body() body: AutocompleteDto) {
    return await this.descartService.getSimilarStoreNames(body.query);
  }

  @Get('/autocomplete/product')
  async getSimilarProductNames(@Body() body: AutocompleteDto) {
    return await this.descartService.getSimilarProductNames(body.query);
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
