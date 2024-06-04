import { IsString, MinLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(2)
  public name: string;
}
