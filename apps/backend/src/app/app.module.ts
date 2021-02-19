import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReceiptService } from './receipt/receipt.service';
import { AuthController, AuthModule } from '@backend/auth';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manufacturer } from './entities/Manufacturer';
import { Product } from './entities/Product';
import { Purchase } from './entities/Purchase';
import { Purchasecustomproduct } from './entities/Purchasecustomproduct';
import { Purchaseproduct } from './entities/Purchaseproduct';
import { Store } from './entities/Store';
import { Storeproduct } from './entities/Storeproduct';
import { User } from './entities/User';
import { DescartMainModule } from './descart/descart-main.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'descart',
      entities: [
        Manufacturer,
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
