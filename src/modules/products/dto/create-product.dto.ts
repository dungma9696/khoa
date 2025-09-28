import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsMongoId,
  IsNumber,
  IsArray,
  IsIn,
  Min,
  IsUrl,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'Product name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Category ID' })
  @IsMongoId()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ description: 'Product price' })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ description: 'Product variants', required: false })
  @IsArray()
  @IsOptional()
  variants?: Array<{
    name: string;
    value: string;
    priceAdjustment?: number;
    stock?: number;
  }>;

  @ApiProperty({ description: 'Product images', required: false })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];

  @ApiProperty({ description: 'Product thumbnail', required: false })
  @IsString()
  @IsOptional()
  thumbnail?: string;

  @ApiProperty({ description: 'Product description', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Product material', required: false })
  @IsString()
  @IsOptional()
  material?: string;

  @ApiProperty({ description: 'Product technology', required: false })
  @IsString()
  @IsOptional()
  technology?: string;

  @ApiProperty({
    description: 'Product status',
    enum: ['available', 'out_of_stock', 'discontinued'],
    required: false,
  })
  @IsString()
  @IsIn(['available', 'out_of_stock', 'discontinued'])
  @IsOptional()
  status?: string;
}
