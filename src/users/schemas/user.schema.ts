import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose';

import { UserCategoryType, UserProfileType, UserRole } from '../dto/user.dto';
import { Wallet } from '../../wallets/schemas/wallet.schema';

@Schema({ versionKey: false })
class ProfileType {
    @Prop({ required: false, type: String })
    type: UserCategoryType
    @Prop({ required: false, type: String })
    bio: string;
    @Prop({ required: false, type: String })
    website: string;
    @Prop({ required: false, type: Object  })
    socialLinks: Record<string, any>;
    // @Prop({ required: false, type: [{ type: Types.ObjectId, ref: Wallet.name }] })
    // walletAddress: Wallet[];
}

@Schema({ versionKey: false })
class ApprovedUserDetails {
    @Prop({ required: false, type: Boolean })
    approved: boolean;
    @Prop({ required: false, type: String })
    approvedBy: string;
    @Prop({ required: false, type: Date, default: new Date() })
    approvedAt: Date;
}

@Schema({ versionKey: false })
export class User extends Document {
    @Prop({ required: false })
    name: string;
    @Prop({ required: false })
    userName: string;
    @Prop({ required: false })
    contactPersonName: string;
    @Prop({ required: false })
    contactPersonEmail: string;
    @Prop({ required: false })
    email: string;
    @Prop({ required: false, type: String })
    role: UserRole = UserRole.User;
    @Prop({ required: false })
    background: string;
    @Prop({ required: false })
    avatar: string;
    @Prop({ required: true })
    uid: string;
    @Prop({ type: String })
    type: UserProfileType;
    @Prop({ type: Array })
    favorites: string[];
    @Prop({ required: false, type: ProfileType })
    profileType: ProfileType;
    @Prop({ required: false, type: Object })
    approved: ApprovedUserDetails;
    @Prop({ required: false, type: Date, default: new Date() })
    updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);