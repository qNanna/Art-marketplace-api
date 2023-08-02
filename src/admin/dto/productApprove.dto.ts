import { ApiProperty } from '@nestjs/swagger';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import * as Joi from 'joi';

@JoiSchemaOptions({ allowUnknown: false, abortEarly: true })
export class ProductApproveDto {
    @ApiProperty({ default: true })
    @JoiSchema(Joi.boolean().required().default(true))
    readonly approved: boolean;

}

@JoiSchemaOptions({ allowUnknown: false, abortEarly: true })
export class ProductTokenApproveDto extends ProductApproveDto {
    @ApiProperty({ required: true })
    @JoiSchema(Joi.string().required())
    readonly tokenId: string;
}

@JoiSchemaOptions({ allowUnknown: false, abortEarly: true })
export class ProductBlockDto { 
    @ApiProperty({ default: true })
    @JoiSchema(Joi.boolean().required().default(true))
    readonly blocked: boolean;
}