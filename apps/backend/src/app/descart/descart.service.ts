import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { DeleteResult, InsertResult, Repository } from 'typeorm';
import { Purchase } from '../entities/Purchase';

import { InjectRepository } from '@nestjs/typeorm';
import { Purchaseproduct } from '../entities/Purchaseproduct';
import { Product } from '../entities/Product';

import { RecommendationsService } from '../recommendations/recommendations.service';
import { Store } from '../entities/Store';
import { CreatePurchaseDto } from './dto/createpurchase.dto';
import { Purchasecustomproduct } from '../entities/Purchasecustomproduct';
import { ProductDto } from './dto/product.dto';

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
    @InjectRepository(Purchasecustomproduct)
    private purchasecustomproductRepository: Repository<Purchasecustomproduct>,
    private recommendationsService: RecommendationsService
  ) {}

  findAllPurchasesByUserId(userId: string, search: string, favorite: string, page: string): Promise<Purchase[]> {
    let query = this.purchaseRepository
      .createQueryBuilder('purchase')
      .leftJoinAndSelect('purchase.store', 'store')
      .select('purchase.id', 'purchase_id')
      .addSelect('store.name', 'storeName')
      .addSelect('purchase.price', 'price')
      .addSelect('purchase.purchasedAt', 'purchaseDate')
      .addSelect('purchase.numItems', 'items')
      .addSelect('store.imageUrl', 'imageUrl')
      .where('purchase.userId = :userId', { userId })

    if (search && search.length !== 0) {
        query = query.where(`store.name like :name`, { name: `%${search}%` });
    }
    if (favorite == "true") {
      query = query.innerJoin('purchase.users', 'user', `user.id = ${userId}`);
    }

    return query.getRawMany();
  }

  getPurchaseProductsByPurchaseId(purchaseId: string): Promise<Purchaseproduct[]> {
    return this.purchaseproductRepository
      .createQueryBuilder('purchaseproduct')
      .leftJoinAndSelect('purchaseproduct.product', 'product')
      .leftJoinAndSelect('product.manufacturer', 'manufacturer')
      .select('product.name', 'productName')
      .addSelect('product.id', 'productId')
      .addSelect('manufacturer.name', 'manufacturerName')
      .addSelect('product.imageUrl', 'imageUrl')
      .addSelect('purchaseproduct.quantity', 'quantity')
      .addSelect('purchaseproduct.price', 'price')
      .addSelect('purchaseproduct.index', 'index')
      .where('purchaseproduct.purchase_id = :id', { id: purchaseId })
      .getRawMany();
  }
  
  getPurchaseCustomProductsByPurchaseId(purchaseId: string): Promise<Purchasecustomproduct[]> {
    return this.purchasecustomproductRepository
      .createQueryBuilder('purchasecustomproduct')
      .select('purchasecustomproduct.name', 'productName')
      .addSelect('purchasecustomproduct.quantity', 'quantity')
      .addSelect('purchasecustomproduct.price', 'price')
      .addSelect('purchasecustomproduct.index', 'index')
      .where('purchasecustomproduct.purchaseId = :id', { id: purchaseId })
      .getRawMany();
  }

  getProductsByProductId(productId: string): Promise<Product[]> {
    return this.productRepository
      .createQueryBuilder('product')
      .innerJoinAndSelect('product.storeproducts', 'storeproducts')
      .innerJoinAndSelect('storeproducts.store', 'store')
      .select('store.name', 'store_name')
      .addSelect('storeproducts.url', 'url')
      .addSelect('storeproducts.price', 'price')
      .addSelect('store.imageUrl', 'image_url')
      .where('product.id = :id', { id: productId })
      .getRawMany();
  }

  getDiscoverProductsByUserId(
    userId: string,
    search: string,
    favorite: string,
    page: string
  ): Promise<Product[]> {
    // const offset = this.PAGE_SIZE * Number(page);
    // const pageSize = this.PAGE_SIZE;

    let query = (
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
        // .offset(offset)
        // .limit(pageSize)
    );
    if (!(search && search.length != 0) && !(favorite == "true")) {
      const productIds: number[] = this.recommendationsService.getRecommendationProductIds();
      query = query.where('product.id IN (:...ids)', { ids: productIds });
    } else {
      if (search && search.length !== 0) {
        query = query.where(`product.name like :name`, { name: `%${search}%` });
      }
      if (favorite == "true") {
        query = query.innerJoin('product.users', 'user', `user.id = ${userId}`);
      }
    }
    
    return query.getRawMany();
  }

  getSimilarStoreNames(name: string): Promise<Store[]> {
    return this.storeRepository
      .createQueryBuilder('store')
      .select('store.id', 'id')
      .addSelect('store.name', 'name')
      .addSelect('store.imageUrl', 'imageUrl')
      .where(`store.name like :name`, { name: `%${name}%` })
      .limit(5)
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
      .limit(5)
      .getRawMany();
  }

  deletePurchase(purchaseId: string): Promise<DeleteResult> {
    return this.purchaseRepository
      .createQueryBuilder('purchase')
      .delete()
      .from(Purchase)
      .where('purchase.id = :id', { id: purchaseId })
      .execute();
  }

  async createPurchase(body: CreatePurchaseDto): Promise<InsertResult[]> {
    const today = new Date().toISOString().substring(0, 10);
    const purchase = await this.purchaseRepository
      .createQueryBuilder('purchase')
      .insert()
      .into(Purchase)
      .values({
        storeId: body.store_id,
        userId: body.user_id,
        price: body.price,
        // TODO reduce with quantities?
        numItems: body.products.length,
        purchasedAt: today,
      })
      .execute();
    return Promise.all(
      body.products.map(
        (product: ProductDto, idx: number): Promise<InsertResult> => {
          if (product.id) {
            return this.purchaseproductRepository
              .createQueryBuilder('purchaseproduct')
              .insert()
              .into(Purchaseproduct)
              .values({
                productId: product.id,
                price: product.price,
                purchaseId: purchase.identifiers[0].id,
                quantity: product.quantity,
                index: idx, // TODO
              })
              .execute();
          } else if (product.name) {
            return this.purchasecustomproductRepository
              .createQueryBuilder('purchasecustomproduct')
              .insert()
              .into(Purchasecustomproduct)
              .values({
                name: product.name,
                price: product.price,
                purchaseId: purchase.identifiers[0].id,
                quantity: product.quantity,
                index: idx, // TODO
              })
              .execute();
          } else {
            throw new HttpException('bad create', HttpStatus.BAD_REQUEST);
          }
        }
      )
    );
  }
}
