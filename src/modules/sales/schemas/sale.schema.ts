import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SaleDocument = Sale & Document;

@Schema({ timestamps: true })
export class Sale {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ type: [Types.ObjectId], ref: 'Product', default: [] })
  product: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: 'User', default: [] })
  user: Types.ObjectId[];

  @Prop({ trim: true })
  description: string;

  @Prop({
    enum: [
      'percentage_off',
      'fixed_amount_off',
      'buy_one_get_one',
      'free_shipping',
    ],
    required: true,
  })
  type: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ type: String })
  promoTime: string;

  @Prop({
    enum: ['all', 'new_customers', 'premium_members', 'specific_users'],
    default: 'all',
  })
  targetCustomer: string;

  @Prop({ min: 0, default: 0 })
  maxUsage: number;

  @Prop({ type: Types.ObjectId, ref: 'Discount', required: true })
  discount: Types.ObjectId;

  @Prop({ enum: ['active', 'inactive', 'expired'], default: 'active' })
  status: string;
}

export const SaleSchema = SchemaFactory.createForClass(Sale);
