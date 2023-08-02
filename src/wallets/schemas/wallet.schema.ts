import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose';

@Schema({ versionKey: false })
export class Wallet extends Document {
    @Prop({ required: true })
    uid: string;
    @Prop({ required: true, default: '' })
    walletAddress: string;
    @Prop({ required: true })
    type: string;
    @Prop({ required: false, type: Date, default: new Date() })
    updatedAt: Date
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);