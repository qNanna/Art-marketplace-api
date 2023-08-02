import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';
import { pick } from 'lodash';
import { BlockchainType } from '../../products/dto/product.dto';

export class WalletType {
    @ApiProperty({ enum: BlockchainType })
    @JoiSchema(Joi.string().valid(...Object.values(BlockchainType)).optional())
    readonly type: BlockchainType;
}

export class WalletDto extends WalletType {
    @ApiProperty()
    @JoiSchema(Joi.string().required())
    readonly walletAddress: string;

    @ApiHideProperty()
    @JoiSchema(Joi.date().optional().default(new Date()))
    readonly updatedAt: Date

    constructor(partial: Partial<any> = {}) {
        super();
        Object.assign(this, pick(partial, ['walletAddress', 'type', 'uid', 'updatedAt']));
    }
}