import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Wallet } from './schemas/wallet.schema';
import { WalletDto } from './dto/wallet.dto';

@Injectable()
export class WalletService {
    constructor(@InjectModel(Wallet.name) private walletModel: Model<Wallet>) {}

    async create(data: WalletDto): Promise<Wallet> {
        return await new this.walletModel({ ...data, updatedAt: new Date() }).save();
    }

    async insertMany(data: WalletDto[]): Promise<Wallet[]> {
        return await this.walletModel.insertMany(data);
    }

    async findOneAndUpdate(filter: Record<string, any>, data: Record<string, any>): Promise<Wallet> {
        return await this.walletModel.findOneAndUpdate({ ...filter }, { ...data }, { new: true }).exec();
    }

    async findOneAndRemove(filter: Record<string, any>): Promise<Wallet> {
        return await this.walletModel.findOneAndRemove({ ...filter }).exec();
    }

    async find(filter: Record<string, any>) {
        return await this.walletModel.find({ ...filter }).exec();
    }

    async findOne(filter: Record<string, any>) {
        return await this.walletModel.findOne({ ...filter }).exec();
    }
}
