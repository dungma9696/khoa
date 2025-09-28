import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CartDocument = Cart & Document;

@Schema({ timestamps: true })
export class Cart {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  user: Types.ObjectId;

  @Prop({ type: [Object], default: [] })
  items: Array<{
    product: Types.ObjectId;
    quantity: number;
    variant?: string;
  }>;

  @Prop({ enum: ['active', 'abandoned', 'converted'], default: 'active' })
  status: string;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
