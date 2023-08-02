import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose';

@Schema({ versionKey: false })
export class CachedProduct extends Document {
  @Prop({ required: true })
  tokenId: string;

  @Prop({ required: false, type: Object }) 
  data : Record<string, any>;

  @Prop({ required: false, type: Object })
  otherData: Record<string, any>;

  @Prop({ required: false })
  fromCache: boolean;

  @Prop({ required: false })
  refreshed: boolean;
  
  @Prop({ required: false, type: Date, default: new Date() })
  updatedAt: Date;
}

export const CahedProductSchema = SchemaFactory.createForClass(CachedProduct);