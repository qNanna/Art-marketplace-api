import { Module } from '@nestjs/common';
import { Swagger } from './swagger';
import { FireBase } from './firebase';
import { JwtToken } from './jwt';
import { Utils } from './utils';
import { BlockChain } from './blockchain';

@Module({
    providers: [Swagger, FireBase, JwtToken, Utils, BlockChain],
    exports: [BlockChain]
})

export class UtilsModule {}