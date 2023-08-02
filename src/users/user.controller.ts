import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, HttpException, Param, Patch, Query, Req, Request } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { ApproveDto } from 'src/products/dto/product.dto';
import { filter } from 'lodash';

@ApiTags('user')
@Controller('api/v1/user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getUsers(@Query() query: ApproveDto) {
        const { offset, limit, approved } = query;

        return await this.userService.findAll(offset, limit, { 'approved.approved': { $eq: approved } });
    }

    @Get(':uid')
    async getUser(@Param('uid') uid: string) {
        return await this.userService.findOne({ uid });
    }

    @Get('userName/:userName')
    async getUserByUserName(@Param('userName') userName: string) {
        return await this.userService.findOne({ userName });
    }

    @Patch()
    @ApiBearerAuth('access-token')
    async updateUser(@Req() req: Request, @Body() data: UserDto) {
        
    }

    // REMOVED

}
