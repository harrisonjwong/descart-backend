import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { DeleteResult, InsertResult, Repository } from 'typeorm';
import { Purchase } from '../entities/Purchase';

import { InjectRepository } from '@nestjs/typeorm';
import { Purchaseproduct } from '../entities/Purchaseproduct';
import { Product } from '../entities/Product';
import { User } from '../entities/User';

import { RecommendationsService } from '../recommendations/recommendations.service';
import { Store } from '../entities/Store';
import { CreatePurchaseDto } from './dto/createpurchase.dto';
import { FavoriteProductDto } from './dto/favoriteproduct.dto';
import { FavoritePurchaseDto } from './dto/favoritepurchase.dto';
import { Purchasecustomproduct } from '../entities/Purchasecustomproduct';
import { ProductDto } from './dto/product.dto';

// TODO - fix return types (I am returning promises of the entities but they no longer match the entities)

@Injectable()
export class DescartService {
  PAGE_SIZE: number = 10;
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
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

  SORT_FIELDS = ['purchaseDate', 'CONVERT(`price`, float)'];

  findAllPurchasesByUserId(
    userId: string,
    search: string,
    favorite: string,
    sort: string,
    pageSize: string,
    page: string
  ): Promise<Purchase[]> {
    console.log(favorite, sort, search);
    let sortField = this.SORT_FIELDS[Math.floor(Number(sort) / 2)];
    let query = this.purchaseRepository
      .createQueryBuilder('purchase')
      .leftJoinAndSelect('purchase.store', 'store')
      .leftJoin('purchase.users', 'users', `users.id=${userId}`)
      .groupBy('purchase.id')
      .select('purchase.id', 'purchase_id')
      .addSelect('store.name', 'storeName')
      .addSelect('purchase.price', 'price')
      .addSelect('purchase.purchasedAt', 'purchaseDate')
      .addSelect('purchase.numItems', 'items')
      .addSelect('store.imageUrl', 'imageUrl')
      .addSelect('COUNT(users.id)', 'favorite')
      .where('purchase.userId = :userId', { userId })
      .orderBy(sortField, Number(sort) % 2 == 0 ? 'DESC' : 'ASC')
      .offset(Number(pageSize) * Number(page))
      .limit(Number(pageSize));

    if (search && search.length !== 0) {
      query = query.where(`store.name like :name`, { name: `%${search}%` });
    }
    if (favorite == 'true') {
      query = query.innerJoin('purchase.users', 'user', `user.id = ${userId}`);
    }

    return query.getRawMany();
  }

  getPurchaseProductsByPurchaseId(
    userId: string,
    purchaseId: string
  ): Promise<Purchaseproduct[]> {
    return this.purchaseproductRepository
      .createQueryBuilder('purchaseproduct')
      .leftJoinAndSelect('purchaseproduct.product', 'product')
      .leftJoinAndSelect('product.manufacturer', 'manufacturer')
      .leftJoin('product.users', 'users', `users.id=${userId}`)
      .groupBy('purchaseproduct.id')
      .select('product.name', 'productName')
      .addSelect('product.id', 'productId')
      .addSelect('manufacturer.name', 'manufacturerName')
      .addSelect('product.imageUrl', 'imageUrl')
      .addSelect('purchaseproduct.quantity', 'quantity')
      .addSelect('purchaseproduct.price', 'price')
      .addSelect('purchaseproduct.index', 'index')
      .addSelect('COUNT(users.id)', 'favorite')
      .where('purchaseproduct.purchase_id = :id', { id: purchaseId })
      .getRawMany();
  }

  getPurchaseCustomProductsByPurchaseId(
    purchaseId: string
  ): Promise<Purchasecustomproduct[]> {
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

  async addOrRemoveFavoriteProducts(userId: number, body: FavoriteProductDto): Promise<void> {
    let productId = body.product_id;
    let favorite = body.favorite;

    let product = await this.productRepository.findOne({ id: productId });

    let user = await this.userRepository.findOne(
      { id: userId },
      { relations: ['products'] }
    );

    if (
      !product ||
      !user ||
      user.products.some((p) => p.id == productId) == (favorite == 'true')
    )
      return;

    favorite == 'true'
      ? user.products.push(product)
      : (user.products = user.products.filter((p) => p.id != product.id));

    await this.userRepository.save(user);
  }

  async addOrRemoveFavoritePurchases(userId: number, body: FavoritePurchaseDto): Promise<void> {
    let purchaseId = body.purchase_id;
    let favorite = body.favorite;

    let purchase = await this.purchaseRepository.findOne({ id: purchaseId });

    let user = await this.userRepository.findOne(
      { id: userId },
      { relations: ['purchases'] }
    );

    if (
      !purchase ||
      !user ||
      user.purchases.some((p) => p.id == purchaseId) == (favorite == 'true')
    )
      return;

    favorite == 'true'
      ? user.purchases.push(purchase)
      : (user.purchases = user.purchases.filter((p) => p.id != purchase.id));

    await this.userRepository.save(user);
  }

  getDiscoverProductsByUserId(
    userId: string,
    search: string,
    favorite: string,
    pageSize: string,
    page: string
  ): Promise<Product[]> {
    let query = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.manufacturer', 'manufacturer')
      .leftJoin('storeproduct', 'sp', 'sp.productId=product.id')
      .leftJoin('product.users', 'users', `users.id=${userId}`)
      .groupBy('product.id')
      .select('product.id', 'id')
      .addSelect('COUNT(sp.id)', 'numStores')
      .addSelect('COUNT(users.id)', 'favorite')
      .addSelect('product.name', 'productName')
      .addSelect('manufacturer.name', 'manufacturerName')
      .addSelect('product.imageUrl', 'imageUrl')
      .offset(Number(page) * Number(pageSize))
      .limit(Number(pageSize));
    if (!(search && search.length != 0) && !(favorite == 'true')) {
      const productIds: number[] = this.recommendationsService.getRecommendationProductIds();
      query = query.where('product.id IN (:...ids)', { ids: productIds });
    } else {
      if (search && search.length !== 0) {
        query = query.where(`product.name like :name`, { name: `%${search}%` });
      }
      if (favorite == 'true') {
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

  async createPurchase(userId: number, body: CreatePurchaseDto): Promise<Purchase> {
    const today = new Date();
    let numItems = 0;
    body.products.map((product: ProductDto) => {
      numItems += product.quantity;
    });
    console.log(body.products);
    const purchase = await this.purchaseRepository
      .createQueryBuilder('purchase')
      .insert()
      .into(Purchase)
      .values({
        storeId: body.store_id,
        userId: userId,
        price: body.price,
        numItems,
        purchasedAt: today,
      })
      .execute();
    await Promise.all(
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
                index: idx,
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
                index: idx,
              })
              .execute();
          } else {
            throw new HttpException('bad create', HttpStatus.BAD_REQUEST);
          }
        }
      )
    );
    let result = await this.purchaseRepository
      .createQueryBuilder('purchase')
      .leftJoinAndSelect('purchase.store', 'store')
      .leftJoin('purchase.users', 'users', `users.id=${userId}`)
      .groupBy('purchase.id')
      .select('purchase.id', 'purchase_id')
      .addSelect('store.name', 'storeName')
      .addSelect('purchase.price', 'price')
      .addSelect('purchase.purchasedAt', 'purchaseDate')
      .addSelect('purchase.numItems', 'items')
      .addSelect('store.imageUrl', 'imageUrl')
      .addSelect('COUNT(users.id)', 'favorite')
      .where(`purchase.id=${purchase.identifiers[0].id}`)
      .getRawOne();

    return result;
  }
}
