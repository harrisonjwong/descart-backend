import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../entities/Product';
import { Purchase } from '../entities/Purchase';
import { Purchaseproduct } from '../entities/Purchaseproduct';

@Module({
  imports: [TypeOrmModule.forFeature([Purchase, Purchaseproduct, Product])],
  exports: [TypeOrmModule],
})
export class DescartModule {}
