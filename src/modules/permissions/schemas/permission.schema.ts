import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PermissionDocument = Permission & Document;

@Schema({ timestamps: true })
export class Permission {
  @Prop({ required: true, trim: true, unique: true })
  name: string;

  @Prop({ trim: true })
  description: string;

  @Prop({ enum: ['active', 'inactive'], default: 'active' })
  status: string;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
