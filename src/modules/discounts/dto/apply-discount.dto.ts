import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ApplyDiscountDto {
  @ApiProperty({ description: 'Discount code' })
  @IsString()
  @IsNotEmpty()
  code: string;
}
