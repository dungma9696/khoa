import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  category: Types.ObjectId;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ type: [Object], default: [] })
  variants: Array<{
    name: string;
    value: string;
    priceAdjustment?: number;
    stock?: number;
  }>;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({ trim: true })
  thumbnail: string;

  @Prop({ trim: true })
  description: string;

  @Prop({ trim: true })
  material: string;

  @Prop({ trim: true })
  technology: string;

  @Prop({ default: '0' })
  rating: string;

  @Prop({
    enum: ['available', 'out_of_stock', 'discontinued'],
    default: 'available',
  })
  status: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
