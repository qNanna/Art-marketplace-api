import { Module } from '@nestjs/common';
import { ProductModule } from '../products/product.module';
import { UserModule } from '../users/user.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { WalletModule } from '../wallets/wallet.module';

@Module({
  imports: [UserModule, ProductModule, WalletModule],
  exports: [],
  controllers: [AdminController],
  providers: [AdminService]
})

export class AdminModule {}
