import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from '../entities/Purchase';
import { Purchaseproduct } from '../entities/Purchaseproduct';

@Module({
  imports: [TypeOrmModule.forFeature([Purchase, Purchaseproduct])],
  exports: [TypeOrmModule],
})
export class DescartModule {}
