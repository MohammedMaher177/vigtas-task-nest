import { Transform } from 'class-transformer';
import { IsString, IsUUID, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @Transform(({ value }) => value.trim())
  name: string;

  @IsNumber()
  price: number;

  @IsUUID()
  categoryId: string;
}
