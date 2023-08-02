import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { UserDto, AuthDto } from './dto/user.dto';
import { WalletService } from '../wallets/wallet.service';
// import { WalletDto } from '../wallets/dto/wallet.dto';
// import { BlockchainType } from '../products/dto/product.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private readonly walletService: WalletService
        ) {}

    async create(data: UserDto | AuthDto): Promise<User> {
        return await new this.userModel({ ...data }).save();
    }

    async findOne(filter: Record<string, any>): Promise<any> {
        const [user] = await this.userModel.aggregate([
            { $match: filter },
            { $lookup: { from: 'wallets', localField: 'uid', foreignField: 'uid', as: 'profileType.walletAddress' } },
            { $set: { 'profileType.walletAddress': '$profileType.walletAddress' } },
            // { $unwind: { path: "$profileType.walletAddress", preserveNullAndEmptyArrays: true } }
        ]).exec();
        return user;
    }

    async findAll(offset: number = 0, limit: number = 5, filter: Record<string, any> = {}): Promise<User[]> {
        return await this.userModel.aggregate([
            { $match: filter }, { $sort: { _id: -1 } },
            { $lookup: { from: 'wallets', localField: 'uid', foreignField: 'uid', as: 'profileType.walletAddress' } },
            { $set: { 'profileType.walletAddress': '$profileType.walletAddress' } },
        ]).skip(offset).limit(limit).exec();
        // return await this.userModel.find(filter).skip(offset).limit(limit).exec();
      }

    async findOneAndUpdate(filter: Record<string, any>, data: Record<string, any>): Promise<User> {
        return await this.userModel.findOneAndUpdate({ ...filter }, { ...data }, { new: true }).exec();
        // .populate('profileType.walletAddress').exec();
    }

    async findOneAndDelete(filter: Record<string, any>): Promise<User> {
        return this.userModel.findOneAndDelete({ ...filter });
    }

    async updateOne(filter: Record<string, any>, data: Record<string, any>) {
        return this.userModel.updateOne({ ...filter }, { ...data });
    }
}

