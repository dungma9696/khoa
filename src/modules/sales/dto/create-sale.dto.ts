import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsMongoId,
  IsArray,
  IsIn,
  IsDateString,
  IsNumber,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSaleDto {
  @ApiProperty({ description: 'Sale name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Target products', required: false })
  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  product?: string[];

  @ApiProperty({ description: 'Target users', required: false })
  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  user?: string[];

  @ApiProperty({ description: 'Sale description', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Sale type',
    enum: [
      'percentage_off',
      'fixed_amount_off',
      'buy_one_get_one',
      'free_shipping',
    ],
  })
  @IsString()
  @IsIn([
    'percentage_off',
    'fixed_amount_off',
    'buy_one_get_one',
    'free_shipping',
  ])
  type: string;

  @ApiProperty({ description: 'Start date' })
  @IsDateString()
  startDate: string;

  @ApiProperty({ description: 'End date' })
  @IsDateString()
  endDate: string;

  @ApiProperty({ description: 'Promotion time', required: false })
  @IsString()
  @IsOptional()
  promoTime?: string;

  @ApiProperty({
    description: 'Target customer',
    enum: ['all', 'new_customers', 'premium_members', 'specific_users'],
    required: false,
  })
  @IsString()
  @IsIn(['all', 'new_customers', 'premium_members', 'specific_users'])
  @IsOptional()
  targetCustomer?: string;

  @ApiProperty({ description: 'Maximum usage', required: false })
  @IsNumber()
  @Min(0)
  @IsOptional()
  maxUsage?: number;

  @ApiProperty({ description: 'Discount ID' })
  @IsMongoId()
  @IsNotEmpty()
  discount: string;

  @ApiProperty({
    description: 'Sale status',
    enum: ['active', 'inactive', 'expired'],
    required: false,
  })
  @IsString()
  @IsIn(['active', 'inactive', 'expired'])
  @IsOptional()
  status?: string;
}
