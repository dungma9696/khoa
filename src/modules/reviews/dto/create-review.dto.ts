import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsMongoId,
  IsNumber,
  Min,
  Max,
  IsIn,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({ description: 'Product ID' })
  @IsMongoId()
  @IsNotEmpty()
  product: string;

  @ApiProperty({ description: 'Review rating (1-5)' })
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({ description: 'Review comment', required: false })
  @IsString()
  @IsOptional()
  comment?: string;

  @ApiProperty({
    description: 'Review status',
    enum: ['pending', 'approved', 'rejected'],
    required: false,
  })
  @IsString()
  @IsIn(['pending', 'approved', 'rejected'])
  @IsOptional()
  status?: string;
}
