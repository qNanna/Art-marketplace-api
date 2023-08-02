import { ApiProperty, ApiPropertyOptional, ApiHideProperty, PartialType } from '@nestjs/swagger';
import { omit, pick } from 'lodash';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import * as Joi from 'joi';

import { ApproveRequestDto } from '../../users/dto/user.dto';
import { ApproveDto } from '../../products/dto/product.dto';

const SIZE_PATTERN: RegExp = /^\d{3,5}\s?[Xx]\s?\d{3,5}$/;

export enum patchOperation { Add = 'Add', Delete = 'Delete' }

@JoiSchemaOptions({ allowUnknown: false, abortEarly: true })
export class PatchOperation {
  @ApiProperty({ enum: patchOperation })
  @JoiSchema(Joi.string().valid(...Object.values(patchOperation)).required())
  operation: string;

  @ApiProperty()
  @JoiSchema(Joi.array().required())
  products: string[];
}

@JoiSchemaOptions({ allowUnknown: false, abortEarly: true })
export class PopulateDto extends ApproveDto {
  @ApiProperty({ default: false })
  @JoiSchema(Joi.boolean().required().default(false))
  populate: boolean;
}

@JoiSchemaOptions({ allowUnknown: false, abortEarly: true })
export class PopulateQueryDto {
  @ApiProperty({ default: false })
  @JoiSchema(Joi.boolean().required().default(false))
  populate: boolean;
}

@JoiSchemaOptions({ allowUnknown: false, abortEarly: true })
export class ArtCollectionDto {
    @ApiProperty() 
    @JoiSchema(Joi.array().optional())
    products: string[];

    @ApiProperty() 
    @JoiSchema(Joi.string().required())
    picture: string;

    @ApiProperty() 
    @JoiSchema(Joi.string().pattern(SIZE_PATTERN).optional())
    size: string;

    @ApiProperty() 
    @JoiSchema(Joi.string().required())
    filePath: string;

    @ApiProperty() 
    @JoiSchema(Joi.string().required()) 
    name: string;

    @ApiPropertyOptional()
    @JoiSchema(Joi.string().optional())
    description: string;

    @ApiHideProperty()
    @JoiSchema(Joi.string().optional())
    createdBy: string;

    @ApiHideProperty()
    @JoiSchema(Joi.object().optional())
    readonly approved: ApproveRequestDto = new ApproveRequestDto();

    @ApiHideProperty()
    @JoiSchema(Joi.date().optional().default(new Date()))
    readonly updatedAt: Date;

    constructor(partial: Partial<any> = {}) {
        Object.assign(this, pick(partial, [
            '_id', 'picture', 'name', 'description', 'createdBy', 
            'filePath', 'size', 'approved', 'updatedAt', 'products' ]));
    }

    omit(...args: string[]): ArtCollectionDto {
        return Object.assign({}, omit(this, args)) as any;
      }
    
    pick(...args: string[]): ArtCollectionDto {
      return Object.assign({}, pick(this, args)) as any;
    }
  }

export class ArtCollectionPartialDto extends PartialType(ArtCollectionDto) {}