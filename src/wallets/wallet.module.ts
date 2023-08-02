import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Wallet, WalletSchema } from './schemas/wallet.schema';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { UserModule } from '../users/user.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Wallet.name, schema: WalletSchema }]),
        forwardRef(() => UserModule)
    ],
    controllers: [WalletController],
    providers: [WalletService],
    exports: [WalletService]
})

export class WalletModule {}
