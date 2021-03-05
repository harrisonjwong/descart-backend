import { Store } from '@backend/data';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ManufacturerService } from './manufacturer.service';

@Controller('manufacturer')
export class ManufacturerController {
  constructor(private manufacturerService: ManufacturerService) {}

  // @UseGuards(JwtAuthGuard)
  @Get('/all')
  getManufacturers() {
    return this.manufacturerService.getManufacturers();
  }

  @Get('/id/:id')
  getManufacturerById(@Param('id') id: string) {
    const found: Store = this.manufacturerService.getManufacturerById(id);
    if (!found) {
      throw new HttpException(
        'id has no manufacturer associated',
        HttpStatus.NOT_FOUND
      );
    }
    return found;
  }
}
