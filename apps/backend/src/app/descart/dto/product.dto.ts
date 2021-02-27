import { IsNotEmpty } from 'class-validator';

export class ProductDto {
  name?: string;

  id?: number;

  @IsNotEmpty()
  price: string;

  @IsNotEmpty()
  quantity: number;
}
