import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReceiptService } from './receipt/receipt.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manufacturer } from './entities/Manufacturer';
import { Category } from './entities/Category';
import { Product } from './entities/Product';
import { Purchase } from './entities/Purchase';
import { Purchasecustomproduct } from './entities/Purchasecustomproduct';
import { Purchaseproduct } from './entities/Purchaseproduct';
import { Store } from './entities/Store';
import { Storeproduct } from './entities/Storeproduct';
import { User } from './entities/User';
import { DescartMainModule } from './descart/descart-main.module';

require('dotenv').config();

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || 'password',
      database: 'descart',
      entities: [
        Manufacturer,
        Category,
        Product,
        Purchase,
        Purchasecustomproduct,
        Purchaseproduct,
        Store,
        Storeproduct,
        User,
      ],
      synchronize: true,
    }),
    DescartMainModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, ReceiptService],
})
export class AppModule {}
