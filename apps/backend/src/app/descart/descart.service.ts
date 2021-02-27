import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { Purchase } from '../entities/Purchase';

import { InjectRepository } from '@nestjs/typeorm';
import { Purchaseproduct } from '../entities/Purchaseproduct';
import { Product } from '../entities/Product';

import { RecommendationsService } from '../recommendations/recommendations.service';
import { Store } from '../entities/Store';

// TODO - fix return types (I am returning promises of the entities but they no longer match the entities)

@Injectable()
export class DescartService {
  PAGE_SIZE: number = 10;
  constructor(
    @InjectRepository(Purchase)
    private purchaseRepository: Repository<Purchase>,
    @InjectRepository(Purchaseproduct)
    private purchaseproductRepository: Repository<Purchaseproduct>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Store)
    private storeRepository: Repository<Store>,
    private recommendationsService: RecommendationsService
  ) {}

  findAllPurchasesByUserId(userId: string): Promise<Purchase[]> {
    return this.purchaseRepository
      .createQueryBuilder('purchase')
      .leftJoinAndSelect('purchase.store', 'store')
      .select('purchase.id', 'purchase_id')
      .addSelect('store.name', 'storeName')
      .addSelect('purchase.price', 'price')
      .addSelect('purchase.purchasedAt', 'purchaseDate')
      .addSelect('purchase.numItems', 'items')
      .addSelect('store.imageUrl', 'imageUrl')
      .where('purchase.userId = :userId', { userId })
      .getRawMany();
  }

  getPurchaseProductByPurchaseId(purchaseId: string): Promise<Purchaseproduct> {
    return this.purchaseproductRepository
      .createQueryBuilder('purchaseproduct')
      .leftJoinAndSelect('purchaseproduct.product', 'product')
      .leftJoinAndSelect('product.manufacturer', 'manufacturer')
      .select('product.name', 'productName')
      .addSelect('product.id', 'product_id')
      .addSelect('manufacturer.name', 'manufacturerName')
      .addSelect('product.imageUrl', 'imageUrl')
      .addSelect('purchaseproduct.quantity', 'quantity')
      .addSelect('purchaseproduct.price', 'price')
      .where('purchaseproduct.id = :id', { id: purchaseId })
      .getRawOne();
  }

  getProductsByProductId(productId: string): Promise<Product[]> {
    return this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.storeproducts', 'storeproducts')
      .leftJoinAndSelect('storeproducts.store', 'store')
      .select('store.name', 'store_name')
      .addSelect('storeproducts.url', 'url')
      .addSelect('storeproducts.price', 'price')
      .addSelect('product.imageUrl', 'image_url')
      .where('product.id = :id', { id: productId })
      .getRawMany();
  }

  getDiscoverProductsByUserId(
    userId: string,
    favorite: string,
    page: string
  ): Promise<Product[]> {
    // const offset = this.PAGE_SIZE * Number(page);
    // const pageSize = this.PAGE_SIZE;

    const productIds: number[] = this.recommendationsService.getRecommendationProductIds();
    return (
      this.productRepository
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.manufacturer', 'manufacturer')
        .leftJoin('storeproduct', 'sp', 'sp.productId=product.id')
        .groupBy('product.id')
        .select('product.id', 'id')
        .addSelect('COUNT(sp.id)', 'numStores')
        .addSelect('product.name', 'productName')
        .addSelect('manufacturer.name', 'manufacturerName')
        .addSelect('product.imageUrl', 'imageUrl')
        .where('product.id IN (:...ids)', { ids: productIds })
        // .offset(offset)
        // .limit(pageSize)
        .getRawMany()
    );
  }

  getSimilarStoreNames(name: string): Promise<Store[]> {
    return this.storeRepository
      .createQueryBuilder('store')
      .select('store.id', 'id')
      .addSelect('store.name', 'name')
      .addSelect('store.imageUrl', 'imageUrl')
      .where(`store.name like :name`, { name: `%${name}%` })
      .getRawMany();
  }

  getSimilarProductNames(name: string): Promise<Product[]> {
    return this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.manufacturer', 'manufacturer')
      .select('product.id', 'id')
      .addSelect('product.name', 'name')
      .addSelect('manufacturer.name', 'manufacturerName')
      .addSelect('product.imageUrl', 'imageUrl')
      .where(`product.name like :name`, { name: `%${name}%` })
      .getRawMany();
  }
}
