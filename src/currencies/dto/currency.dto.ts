import { ApiProperty } from '@nestjs/swagger';
import { JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';
import { BlockchainType } from '../../products/dto/product.dto';

const BlockChainTypeQuery = { ...BlockchainTypeAll, ...BlockchainType }

export class CurrencyDto {
    @ApiProperty({ enum: BlockChainTypeQuery, default: BlockChainTypeQuery.All }) 
    @JoiSchema(Joi.string().valid(...Object.values(BlockChainTypeQuery)).optional())
    type: BlockchainType
}
