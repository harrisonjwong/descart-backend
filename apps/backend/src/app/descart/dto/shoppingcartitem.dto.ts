import { IsNotEmpty } from 'class-validator';

export class ShoppingCartItemDto {
  @IsNotEmpty()
  storeproduct_id: number;

  add_item: string;
}
