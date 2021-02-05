import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReceiptService } from './receipt/receipt.service';
import { AuthController, AuthModule } from '@backend/auth';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';

@Module({
  imports: [AuthModule],
  controllers: [
    AppController,
    AuthController,
    UserController,
    ProductController,
  ],
  providers: [AppService, ReceiptService, UserService, ProductService],
})
export class AppModule {}
