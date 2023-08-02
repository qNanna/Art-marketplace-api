import { Module } from '@nestjs/common';
import { UtilsModule } from '../utils/utils.module';
import { CurrencyService } from './currency.service';

@Module({
    imports: [UtilsModule],
    controllers: [],
    providers: [CurrencyService],
    exports: [CurrencyService]
})
export class CurrencyModule {}
