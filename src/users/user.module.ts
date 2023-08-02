import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './schemas/user.schema';
import { JoiPipeModule } from 'nestjs-joi';
import { WalletModule } from '../wallets/wallet.module';

@Module({
    imports: [
      MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      JoiPipeModule, forwardRef(() => WalletModule) 
      ],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService]
})

export class UserModule {
}
