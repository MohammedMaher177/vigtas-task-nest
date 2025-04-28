import { IsString, IsDecimal, IsUUID } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsDecimal()
  price: number;

  @IsUUID()
  categoryId: string;  // ID of the category to which the product belongs
}
