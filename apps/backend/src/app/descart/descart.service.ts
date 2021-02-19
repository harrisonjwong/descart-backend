import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { Purchase } from '../entities/Purchase';

import { InjectRepository } from '@nestjs/typeorm';
import { Purchaseproduct } from '../entities/Purchaseproduct';

@Injectable()
export class DescartService {
  constructor(
    @InjectRepository(Purchase)
    private purchaseRepository: Repository<Purchase>,
    @InjectRepository(Purchaseproduct)
    private purchaseproductRepository: Repository<Purchaseproduct>
  ) {}

  findAllPurchasesByUserId(id: string): Promise<Purchase[]> {
    return this.purchaseRepository.find({
      relations: ['store'],
      where: { userId: Number(id) },
    });
  }

  getPurchaseProductByPurchaseId(id: string): Promise<Purchaseproduct> {
    return this.purchaseproductRepository.findOne({
      where: { purchaseId: Number(id) },
      relations: ['purchase', 'product'],
    });
  }
}
