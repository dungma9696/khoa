import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DiscountDocument = Discount & Document;

@Schema({ timestamps: true })
export class Discount {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ trim: true })
  description: string;

  @Prop({ required: true, trim: true, unique: true, uppercase: true })
  code: string;

  @Prop({ required: true, trim: true })
  value: string;

  @Prop({ enum: ['percentage', 'fixed_amount'], required: true })
  type: string;

  @Prop({ min: 0 })
  amount: number;

  @Prop({ min: 0, max: 100 })
  percentage: number;

  @Prop({ min: 0, default: 0 })
  minOrderValue: number;

  @Prop({ min: 0, default: 0 })
  maxDiscountAmount: number;

  @Prop({ min: 0, default: 0 })
  usageLimit: number;

  @Prop({ min: 0, default: 0 })
  usedCount: number;

  @Prop({ default: new Date() })
  startDate: Date;

  @Prop({ default: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) }) // 30 days from now
  endDate: Date;

  @Prop({ enum: ['active', 'inactive', 'expired'], default: 'active' })
  status: string;
}

export const DiscountSchema = SchemaFactory.createForClass(Discount);
