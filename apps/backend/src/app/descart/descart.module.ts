import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../entities/Product';
import { Purchase } from '../entities/Purchase';
import { Purchasecustomproduct } from '../entities/Purchasecustomproduct';
import { Purchaseproduct } from '../entities/Purchaseproduct';
import { Store } from '../entities/Store';
import { Storeproduct } from '../entities/Storeproduct';
import { User } from '../entities/User';
import { Category } from '../entities/Category';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Purchase,
      Purchaseproduct,
      Product,
      Store,
      Purchasecustomproduct,
      Storeproduct,
      Category,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class DescartModule {}
