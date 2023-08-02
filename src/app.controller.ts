import { Controller, Get, HttpException, Query, Render } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from './products/product.service';
import { CollectionService } from './collections/collection.service';
import { BlockChain } from './utils/blockchain';
import { CurrencyService } from './currencies/currency.service';

@Controller('api/v1')
export class AppController {
    constructor(
        private readonly productService: ProductService, 
        private readonly collectionService: CollectionService,
        private readonly blockChain: BlockChain,
        private readonly currencyService: CurrencyService
    ) {}

    @ApiTags('hbs views')
    @Get('/auth')
    @Render('index')
    root() {
        return { message: 'Firebase auth page' };
    }

    @ApiTags('currency')
    @Get('currency')
    async getCurrency() {
        try {
            return await this.currencyService.getCurrency();
        } catch(error) {
            throw new HttpException({ error: { message: String(error) } }, 500);
        }
    }
}
