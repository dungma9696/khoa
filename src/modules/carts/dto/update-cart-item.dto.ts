import {
  IsString,
  IsOptional,
  IsMongoId,
  IsNumber,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCartItemDto {
  @ApiProperty({ description: 'Product ID' })
  @IsMongoId()
  product: string;

  @ApiProperty({ description: 'New quantity' })
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty({ description: 'Product variant', required: false })
  @IsString()
  @IsOptional()
  variant?: string;
}
