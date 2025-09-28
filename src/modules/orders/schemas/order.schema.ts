import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ type: [Object], required: true })
  orderItems: Array<{
    product: Types.ObjectId;
    quantity: number;
    price: number;
    variant?: string;
  }>;

  @Prop({ type: Object, required: true })
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
    city: string;
    district: string;
    ward: string;
  };

  @Prop({ required: true, min: 0 })
  totalPrice: number;

  @Prop({
    enum: ['credit_card', 'paypal', 'cod', 'bank_transfer'],
    required: true,
  })
  paymentMethod: string;

  @Prop({ type: [Types.ObjectId], ref: 'Discount', default: [] })
  discount: Types.ObjectId[];

  @Prop({
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  })
  status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
