import { Injectable } from '@nestjs/common';
import { BlockChain } from '../utils/blockchain';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CurrencyService {
    private _url: string;
    public currencyCached: Record<string, any>;

    constructor(private readonly blockchain: BlockChain, private readonly configService: ConfigService) {
        this._url = this.configService.get<string>('CURRENCY_API');
    }

    async fetch(type: string = 'All'): Promise<any> {
        return await this.blockchain.fetch(this._url.replace('<BLOCKCHAIN>', type));
    }

    // REMOVED
}
