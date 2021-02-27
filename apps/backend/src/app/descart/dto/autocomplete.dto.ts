import { IsNotEmpty } from 'class-validator';

export class AutocompleteDto {
  @IsNotEmpty()
  query: string;
}
