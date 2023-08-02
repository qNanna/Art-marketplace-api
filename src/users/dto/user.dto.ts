import { ApiProperty, ApiPropertyOptional, ApiHideProperty } from '@nestjs/swagger';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import * as Joi from 'joi';
import { pick } from 'lodash';

const EMAIL_PATTERN: RegExp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

export enum UserRole { User = 'User', UserAdmin = 'UserAdmin', SuperAdmin = 'SuperAdmin', ProductAdmin = 'ProductAdmin' }
export enum UserProfileType { Personal = 'Personal', Organisation = 'Organisation' }
export enum UserCategoryType { 
    Artist = 'Artist', Curator = 'Curator', Collector = 'Collector', 
    ArtDealer = 'ArtDealer', Gallery = 'Gallery', Museum = 'Museum', 
    Collection = 'Collection', Institution = 'Institution' 
}

@JoiSchemaOptions({ allowUnknown: false, abortEarly: true })
export class ApproveRequestDto {
  constructor(approved: boolean = false, approvedBy: string = '') {
    this.approved = approved;
    this.approvedBy = approvedBy;
  }
  
  @ApiProperty({ default: false }) 
  @JoiSchema(Joi.bool().required())
  readonly approved: boolean = false;

  @ApiProperty({ default: 'someClown/d1425ce8-c7b9-11ec-9d64-0242ac120002' })
  @JoiSchema(Joi.string().required())
  readonly approvedBy: string;

  @ApiHideProperty()
  @JoiSchema(Joi.date().optional().default(new Date()))
  readonly approvedAt: Date = new Date();
}

export class AuthDto {
  readonly uid: string;
  readonly email: string;

  constructor(uid: string, email: string) {
    this.uid = uid; this.email = email;
  }
}

@JoiSchemaOptions({ allowUnknown: false, abortEarly: true })
export class UserDto {
  @ApiHideProperty() 
  @JoiSchema(Joi.string().min(7).optional().invalid('string'))
  readonly uid: string;

  @ApiHideProperty() 
  @JoiSchema(Joi.string().pattern(EMAIL_PATTERN).optional())
  readonly email: string;

  @ApiProperty({ default: 'John' }) @ApiPropertyOptional()
  @JoiSchema(Joi.string().min(2).optional())
  readonly name: string;

  @ApiProperty({ default: 'JohnDoe_23' }) @ApiPropertyOptional()
  @JoiSchema(Joi.string().min(2).optional())
  readonly userName: string;

  @ApiProperty({ default: 'Jully' }) @ApiPropertyOptional()
  @JoiSchema(Joi.string().min(2).optional())
  public contactPersonName: string;

  @ApiProperty({ default: 'Jully@gmail.com' }) @ApiPropertyOptional()
  @JoiSchema(Joi.string().pattern(EMAIL_PATTERN).optional())
  readonly contactPersonEmail: string;

  // @ApiHideProperty() 
  // @JoiSchema(Joi.string().valid(...Object.values(UserRole)).optional())
  // readonly role: string;

  @ApiProperty({ default: 'da83f9b6-c7b8-11ec-9d64-0242ac120002' }) @ApiPropertyOptional()
  @JoiSchema(Joi.string().min(6).optional())
  readonly background: string;

  @ApiProperty({ default: 'da83f9b6-c7b8-11ec-9d64-0242ac120002' }) @ApiPropertyOptional()
  @JoiSchema(Joi.string().min(6).optional())
  readonly avatar: string;

  @ApiProperty({ default: UserProfileType.Personal }) @ApiPropertyOptional()
  @JoiSchema(Joi.string().valid(...Object.values(UserProfileType)).optional())
  readonly type: UserProfileType;

  @ApiHideProperty()
  @JoiSchema(Joi.array().optional())
  favorites: string[];

  @ApiProperty({ default: UserProfileTypeDto }) @ApiPropertyOptional()
  @JoiSchema(Joi.object().optional())
  readonly profileType: UserProfileTypeDto;

  @ApiHideProperty() 
  @JoiSchema(Joi.object().optional())
  readonly approved: ApproveRequestDto;

  constructor(partial: Partial<any>) {
    Object.assign(this, pick(partial, [
      '_id', 'email', 'role', 'uid', 'profileType', 'type', 'avatar', 'background',
      'contactPersonEmail', 'contactPersonName', 'name', 'userName', 'favorites', 'approved'
    ]));
  }
}