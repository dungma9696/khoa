import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RoleDocument = Role & Document;

@Schema({ timestamps: true })
export class Role {
  @Prop({ required: true, trim: true, unique: true })
  name: string;

  @Prop({ type: [Types.ObjectId], ref: 'Permission', default: [] })
  permissions: Types.ObjectId[];

  @Prop({ enum: ['active', 'inactive'], default: 'active' })
  status: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
