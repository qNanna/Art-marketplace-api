import { ApiProperty, ApiPropertyOptional, ApiHideProperty, PartialType } from '@nestjs/swagger';
import { omit, pick } from 'lodash';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import { ApproveRequestDto } from '../../users/dto/user.dto';
import * as Joi from 'joi';

const SIZE_PATTERN: RegExp = /^\d{3,5}\s?[Xx]\s?\d{3,5}$/;

export enum BlockchainType { Near = 'Near', Ethereum = 'Ethereum' }
export enum showsType { All = 'All', Collections = 'Collections', Products = 'Products' }

@JoiSchemaOptions({ allowUnknown: false, abortEarly: true })
export class ProductDto {
  @ApiProperty() 
  @JoiSchema(Joi.string().required())
  readonly picture: string;

  @ApiProperty() 
  @JoiSchema(Joi.string().required())
  readonly name: string;

  @ApiProperty() @ApiPropertyOptional()
  @JoiSchema(Joi.string().optional())
  readonly medium: string;

  @ApiProperty() 
  @JoiSchema(Joi.string().required())
  readonly genre: string;

  @ApiProperty() @ApiPropertyOptional()
  @JoiSchema(Joi.string().optional())
  readonly bio: string;

  @ApiProperty() @ApiPropertyOptional()
  @JoiSchema(Joi.string().min(5).optional())
  readonly description: string;

  @ApiHideProperty() // @ApiProperty() 
  @JoiSchema(Joi.string().optional())
  readonly createdBy: string;

  @ApiProperty() // @ApiHideProperty()
  @JoiSchema(Joi.string().required())
  readonly ownedBy: string;

  @ApiHideProperty()
  @JoiSchema(Joi.object().optional())
  readonly approved: ApproveRequestDto = new ApproveRequestDto();

  @ApiHideProperty()
  @JoiSchema(Joi.date().optional().default(new Date()))
  readonly updatedAt: Date;

  // TODO: split to other layer
  constructor(partial: Partial<any> = {}) {
    Object.assign(this, pick(partial, [
      '_id', 'picture', 'name', 'medium', 'genre', 'bio', 'description',
      'artist', 'createdBy', 'ownedBy', 'presentedBy', 'artCollection',
      'year', 'price', 'tokenId', 'blockchain', 'typeOfLicense', 'otherInfo',
      'comments', 'contractId', 'filePath', 'artistsWallets', 'royaltiesWallets', 'size',
      'commentForAdmin', 'approved', 'blocked', 'quantity', 'edition', 'createdAt', 'updatedAt',
    ]));
  }

  omit(...args: string[]): ProductDto {
    return Object.assign({}, omit(this, args)) as any;
  }

  pick(...args: string[]): ProductDto {
    return Object.assign({}, pick(this, args)) as any;
  }
}

export class ProdctPartialDto extends PartialType(ProductDto) {}