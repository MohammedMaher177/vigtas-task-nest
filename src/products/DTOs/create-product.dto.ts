import { Transform } from 'class-transformer';
import { IsString, IsDecimal, IsUUID } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @Transform(({ value }) => value.trim())
  name: string;

  @IsDecimal()
  price: number;

  @IsUUID()
  categoryId: string;
}
