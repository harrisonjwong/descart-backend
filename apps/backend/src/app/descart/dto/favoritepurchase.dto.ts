import { IsNotEmpty } from 'class-validator';

export class FavoritePurchaseDto {
  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  purchase_id: number;

  favorite: string;
}
