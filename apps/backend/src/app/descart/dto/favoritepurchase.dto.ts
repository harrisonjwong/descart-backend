import { IsNotEmpty } from 'class-validator';

export class FavoritePurchaseDto {
  @IsNotEmpty()
  purchase_id: number;

  favorite: string;
}
