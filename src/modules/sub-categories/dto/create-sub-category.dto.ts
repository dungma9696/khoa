import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsMongoId,
  IsIn,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubCategoryDto {
  @ApiProperty({ description: 'Sub-category name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Sub-category description', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Gender target',
    enum: ['Male', 'Female', 'Unisex'],
    required: false,
  })
  @IsString()
  @IsIn(['Male', 'Female', 'Unisex'])
  @IsOptional()
  gender?: string;

  @ApiProperty({ description: 'Parent category ID' })
  @IsMongoId()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    description: 'Sub-category status',
    required: false,
    default: 'active',
  })
  @IsString()
  @IsOptional()
  status?: string;
}
