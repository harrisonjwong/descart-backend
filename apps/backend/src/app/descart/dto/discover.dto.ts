import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DiscoverDto {
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsNotEmpty()
  @IsString()
  query: string;

  @IsNotEmpty()
  @IsBoolean()
  favorite: boolean;

  @IsNotEmpty()
  @IsNumber()
  page: number;
}
