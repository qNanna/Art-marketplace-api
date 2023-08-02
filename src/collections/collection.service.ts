import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';

import { ArtCollection } from './schemas/collection.schema';
import { Product } from '../products/schemas/product.schema';
import { ProductService } from '../products/product.service';
import { BlockChain } from '../utils/blockchain';

@Injectable()
export class CollectionService {
    constructor(
        @InjectModel(ArtCollection.name) private collectionModel: Model<ArtCollection>,
        private readonly productService: ProductService,
        private readonly blockChain: BlockChain 
    ) {}

    async create(data: Record<string, any>): Promise<ArtCollection> {
        return await new this.collectionModel({ ...data }).save();
    }

    async findOneAndUpdate(populate: boolean, filter: Record<string, any>, data: Record<string, any>): Promise<ArtCollection> {
        return await this.collectionModel.findOneAndUpdate({ ...filter }, { ...data }, { new: true }).populate('products').exec()
    }

    async findOneAndDelete(filter: Record<string, any>): Promise<ArtCollection> {
        return this.collectionModel.findOneAndDelete({ ...filter });
    }

    async find(offset: number, limit: number, populate: boolean, filter: Record<string, any> = {}): Promise<ArtCollection[]> {
        return await this.collectionModel.find({ ...filter }).skip(offset).limit(limit).exec()
      }

    async search_aggregate(value: string, offset: number, limit: number, populate: boolean, filter: Record<string, any> = {}): Promise<ArtCollection[]> {
        const collection = await this.collectionModel.aggregate(options).skip(offset).limit(limit).exec();
        return collection;
    }

    async search(value: string, offset: number, limit: number, populate: boolean, filter: Record<string, any> = {}): Promise<ArtCollection[]> {
        return await this.collectionModel.find({ 
            name: { $regex: value, $options: 'i' }, 
            ...filter 
        }).skip(offset).limit(limit).populate('products').exec()

    // REMOVED
    }
}
