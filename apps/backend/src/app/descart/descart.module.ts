import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../entities/Product';
import { Purchase } from '../entities/Purchase';
import { Purchasecustomproduct } from '../entities/Purchasecustomproduct';
import { Purchaseproduct } from '../entities/Purchaseproduct';
import { Store } from '../entities/Store';
import { Storeproduct } from '../entities/Storeproduct';
import { User } from '../entities/User';

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
    ]),
  ],
  exports: [TypeOrmModule],
})
export class DescartModule {}
