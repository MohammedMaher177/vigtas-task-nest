import { Transform } from 'class-transformer';
import { IsString, IsUUID, IsNumber, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @Transform(({ value }) => value.trim())
  name: string;

  @IsNumber()
  @Min(1)
  price: number;

  @IsUUID()
  categoryId: string;
}
