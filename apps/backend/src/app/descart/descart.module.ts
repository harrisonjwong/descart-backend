import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../entities/Product';
import { Purchase } from '../entities/Purchase';
import { Purchasecustomproduct } from '../entities/Purchasecustomproduct';
import { Purchaseproduct } from '../entities/Purchaseproduct';
import { Store } from '../entities/Store';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Purchase,
      Purchaseproduct,
      Product,
      Store,
      Purchasecustomproduct,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class DescartModule {}
