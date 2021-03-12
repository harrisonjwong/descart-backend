import { IsNotEmpty } from 'class-validator';

export class FavoriteProductDto {
  @IsNotEmpty()
  product_id: number;

  favorite: string;
}
