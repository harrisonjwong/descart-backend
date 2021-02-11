import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReceiptService } from './receipt/receipt.service';
import { AuthController, AuthModule } from '@backend/auth';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { PurchasedProductController } from './purchased-product/purchased-product.controller';
import { PurchasedProductService } from './purchased-product/purchased-product.service';
import { StoreService } from './store/store.service';
import { StoreController } from './store/store.controller';
import { PurchaseController } from './purchase/purchase.controller';
import { PurchaseService } from './purchase/purchase.service';
import { FavoriteProductController } from './favorite-product/favorite-product.controller';
import { FavoriteProductService } from './favorite-product/favorite-product.service';
import { ManufacturerController } from './manufacturer/manufacturer.controller';
import { ManufacturerService } from './manufacturer/manufacturer.service';

@Module({
  imports: [AuthModule],
  controllers: [
    AppController,
    AuthController,
    UserController,
    ProductController,
    PurchasedProductController,
    StoreController,
    PurchaseController,
    FavoriteProductController,
    ManufacturerController,
  ],
  providers: [
    AppService,
    ReceiptService,
    UserService,
    ProductService,
    PurchasedProductService,
    StoreService,
    PurchaseService,
    FavoriteProductService,
    ManufacturerService,
  ],
})
export class AppModule {}
