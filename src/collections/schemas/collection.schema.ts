import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose';
import { Product, ApprovedProductDetails } from '../../products/schemas/product.schema';


@Schema({ versionKey: false })
export class ArtCollection extends Document {
  @Prop({ required: true, type: [{ type: Types.ObjectId, ref: Product.name }] })
  products: Product[];
  
  @Prop({ required: true }) 
  picture: string;

  @Prop({ required: true }) 
  name: string;

  @Prop({ required: false }) 
  description: string;

  @Prop({ required: true }) 
  createdBy: string;

  @Prop({ required: false }) 
  filePath: string;

  @Prop({ required: false })
  size: string;

  @Prop({ required: false, type: Object }) 
  approved: ApprovedProductDetails;

  @Prop({ required: false, type: Date, default: new Date() })
  updatedAt: Date;

  public static converToObjectId(id: string): Types.ObjectId {
    return new Types.ObjectId(id);
  } 
}

export const ArtCollectionSchema = SchemaFactory.createForClass(ArtCollection);