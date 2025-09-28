import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsIn,
  IsNumber,
  Min,
  Max,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDiscountDto {
  @ApiProperty({ description: 'Discount name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Discount description', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Discount code' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ description: 'Discount value' })
  @IsString()
  @IsNotEmpty()
  value: string;

  @ApiProperty({
    description: 'Discount type',
    enum: ['percentage', 'fixed_amount'],
  })
  @IsString()
  @IsIn(['percentage', 'fixed_amount'])
  type: string;

  @ApiProperty({ description: 'Discount amount', required: false })
  @IsNumber()
  @Min(0)
  @IsOptional()
  amount?: number;

  @ApiProperty({ description: 'Discount percentage', required: false })
  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  percentage?: number;

  @ApiProperty({ description: 'Minimum order value', required: false })
  @IsNumber()
  @Min(0)
  @IsOptional()
  minOrderValue?: number;

  @ApiProperty({ description: 'Maximum discount amount', required: false })
  @IsNumber()
  @Min(0)
  @IsOptional()
  maxDiscountAmount?: number;

  @ApiProperty({ description: 'Usage limit', required: false })
  @IsNumber()
  @Min(0)
  @IsOptional()
  usageLimit?: number;

  @ApiProperty({ description: 'Start date', required: false })
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @ApiProperty({ description: 'End date', required: false })
  @IsDateString()
  @IsOptional()
  endDate?: string;

  @ApiProperty({
    description: 'Discount status',
    enum: ['active', 'inactive', 'expired'],
    required: false,
  })
  @IsString()
  @IsIn(['active', 'inactive', 'expired'])
  @IsOptional()
  status?: string;
}
