import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsMongoId,
  IsNumber,
  IsArray,
  IsIn,
  Min,
  ValidateNested,
  IsObject,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class OrderItemDto {
  @ApiProperty({ description: 'Product ID' })
  @IsMongoId()
  @IsNotEmpty()
  product: string;

  @ApiProperty({ description: 'Quantity' })
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty({ description: 'Price per item' })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ description: 'Product variant', required: false })
  @IsString()
  @IsOptional()
  variant?: string;
}

export class ShippingAddressDto {
  @ApiProperty({ description: 'Recipient name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Phone number' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ description: 'Address' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ description: 'City' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ description: 'District' })
  @IsString()
  @IsNotEmpty()
  district: string;

  @ApiProperty({ description: 'Ward' })
  @IsString()
  @IsNotEmpty()
  ward: string;
}

export class CreateOrderDto {
  @ApiProperty({ description: 'Order items', type: [OrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  orderItems: OrderItemDto[];

  @ApiProperty({ description: 'Shipping address', type: ShippingAddressDto })
  @IsObject()
  @ValidateNested()
  @Type(() => ShippingAddressDto)
  shippingAddress: ShippingAddressDto;

  @ApiProperty({ description: 'Total price' })
  @IsNumber()
  @Min(0)
  totalPrice: number;

  @ApiProperty({
    description: 'Payment method',
    enum: ['credit_card', 'paypal', 'cod', 'bank_transfer'],
  })
  @IsString()
  @IsIn(['credit_card', 'paypal', 'cod', 'bank_transfer'])
  paymentMethod: string;

  @ApiProperty({ description: 'Applied discounts', required: false })
  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  discount?: string[];

  @ApiProperty({
    description: 'Order status',
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    required: false,
  })
  @IsString()
  @IsIn(['pending', 'processing', 'shipped', 'delivered', 'cancelled'])
  @IsOptional()
  status?: string;
}
