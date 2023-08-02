import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UserModule } from './users/user.module';
import { getEnvPath } from './common/helper/env.helper';
import { UtilsModule } from './utils/utils.module';
import { ProductModule } from './products/product.module';
import { AuthMiddleware } from './middlewares/auth/auth.middleware';
import { AppController } from './app.controller';
import { UserController } from './users/user.controller';
import { ProductController } from './products/product.controller';
import { AdminModule } from './admin/admin.module';
import { AdminController } from './admin/admin.controller';
import { WalletModule } from './wallets/wallet.module';
import { CurrencyModule } from './currencies/currency.module';
import { WalletController } from './wallets/wallet.controller';
import { CollectionModule } from './collections/collection.module';
import { CollectionController } from './collections/collection.controller';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);
const Config = ConfigModule.forRoot({ envFilePath, isGlobal: true });
const Mongoose = MongooseModule.forRootAsync({ 
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    uri: configService.get<string>('DATABASE_HOST'),
  }),
  inject: [ConfigService] 
});

@Module({
  imports: [
    Mongoose, Config, CurrencyModule, UserModule, ProductModule,
    WalletModule, UtilsModule, AdminModule, CollectionModule
  ],
  controllers: [AppController],
  providers: [],
  exports: [Mongoose, Config, UserModule, WalletModule, ProductModule, UtilsModule, AdminModule]
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: '/(.*)', method: RequestMethod.GET }
      )
      .forRoutes(UserController, ProductController, AdminController, WalletController, CollectionController)
  }
}
