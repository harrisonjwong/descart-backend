import { IsNotEmpty } from 'class-validator';

export class FavoriteProductDto {
  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  product_id: number;

  favorite: string;
}
