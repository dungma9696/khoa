import {
  IsOptional,
  IsString,
  IsNumber,
  Min,
  IsMongoId,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class FindAllProductsDto {
  @ApiProperty({ description: 'Page number', required: false, default: 1 })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @ApiProperty({ description: 'Items per page', required: false, default: 10 })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1)
  @IsOptional()
  limit?: number = 10;

  @ApiProperty({ description: 'Search keyword', required: false })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiProperty({ description: 'Category ID filter', required: false })
  @IsMongoId()
  @IsOptional()
  category?: string;

  @ApiProperty({ description: 'Status filter', required: false })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({
    description: 'Sort field',
    required: false,
    default: 'createdAt',
  })
  @IsString()
  @IsOptional()
  sortBy?: string = 'createdAt';

  @ApiProperty({ description: 'Sort order', required: false, default: 'desc' })
  @IsString()
  @IsOptional()
  sortOrder?: 'asc' | 'desc' = 'desc';
}
