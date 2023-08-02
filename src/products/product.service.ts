import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import { BlockChain } from '../utils/blockchain';
import { ConfigService } from '@nestjs/config';
import { CurrencyService } from '../currencies/currency.service';
import { BlockchainType } from './dto/product.dto';
import { CachedProduct } from './schemas/cached_product.schema';

@Injectable()
export class ProductService {
    private cacheDelay: number;
    private ethTargetUrl: string;
    constructor(
        @InjectModel(Product.name) private productModel: Model<Product>,
        @InjectModel(CachedProduct.name) private cachedProduct: Model<CachedProduct>,
        private readonly configService: ConfigService,
        private readonly currencyService: CurrencyService
        ) {
            this.cacheDelay = this.configService.get<number>('CACHING_PRODUCT_IN_DAYS');
            this.ethTargetUrl = this.configService.get<string>('ETH_TARGET_API_URL');
        }

    async create(data: Record<string, any>): Promise<Product> {
        return await new this.productModel({ ...data }).save();
    }

    async findOne(filter: Record<string, any>): Promise<Product> {
        return await this.productModel.findOne({ ...filter }).exec();
    }

    // REMOVED
}
