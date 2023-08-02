import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
// import { Transform } from '@nestjs/class-transformer';
import { Document, Types } from 'mongoose';

@Schema({ versionKey: false })
export class ApprovedProductDetails {
  @Prop({ required: false, type: Boolean, default: false })
  approved: boolean;
  @Prop({ required: false, type: String })
  approvedBy: string;
  @Prop({ required: false, type: Date, default: new Date() })
  approvedAt: Date;
}

@Schema({ versionKey: false })
export class Product {
  // @Prop({ required: false, type: Types.ObjectId, ref: Product.name })
  // _id: Types.ObjectId;
  @Prop({ required: true }) 
  picture: string;
  @Prop({ required: true }) 
  name: string;
  @Prop({ required: false }) 
  medium: string;
  @Prop({ required: true }) 
  genre: string;
  @Prop({ required: false }) 
  // REMOVED
  @Prop({ required: false, type: Date, default: new Date() })
  updatedAt: Date;

  public static converToObjectId(id: string): Types.ObjectId {
    return new Types.ObjectId(id);
  } 
}

export type ProductDocument = Product & Document;
export const ProductSchema = SchemaFactory.createForClass(Product);
