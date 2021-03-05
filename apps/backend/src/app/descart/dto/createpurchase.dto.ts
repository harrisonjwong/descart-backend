import { IsNotEmpty } from 'class-validator';
import { ProductDto } from './product.dto';

export class CreatePurchaseDto {
  @IsNotEmpty()
  store_id: number;

  @IsNotEmpty()
  price: string;

  @IsNotEmpty()
  products: ProductDto[];
}
