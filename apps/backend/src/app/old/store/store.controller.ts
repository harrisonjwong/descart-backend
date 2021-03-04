import { Store } from '@backend/data';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { StoreService } from './store.service';

@Controller('store')
export class StoreController {
  constructor(private storeService: StoreService) {}

  // @UseGuards(JwtAuthGuard)
  @Get('/all')
  getStores() {
    return this.storeService.getStores();
  }

  @Get('/id/:id')
  getStoreById(@Param('id') id: string) {
    const found: Store = this.storeService.getStoreById(id);
    if (!found) {
      throw new HttpException(
        'id has no store associated',
        HttpStatus.NOT_FOUND
      );
    }
    return found;
  }
}
