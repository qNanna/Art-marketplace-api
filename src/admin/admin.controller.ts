import { Controller, Delete, HttpException, Param, Patch, Query, Req, Request, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../guards/roles/roles.guard';
import { ApproveRequestDto } from '../users/dto/user.dto';
import * as admin from 'firebase-admin';
import { UserService } from '../users/user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProductService } from 'src/products/product.service';
import { ProductApproveDto, ProductBlockDto, ProductTokenApproveDto } from './dto/productApprove.dto';
import { WalletService } from '../wallets/wallet.service';

@ApiTags('admin')
@ApiBearerAuth('access-token')

@Controller('api/v1/admin')
export class AdminController {
    constructor(
        private readonly userService: UserService, 
        private readonly productService: ProductService,
        private readonly walletService: WalletService
        ) {}

    @Delete('user/:uid')
    @UseGuards(new RolesGuard(['UserAdmin']))
    async deleteUser(@Param('uid') uid: string) {
        
    }

    @Patch('user/approve/:uid')
    @UseGuards(new RolesGuard(['UserAdmin']))
    async approveUser(@Req() req: Request, @Param('uid') uid: string, @Query('approve') approve: boolean = true) {
        
    }

    @Patch('product/approve/:id')
    @UseGuards(new RolesGuard(['ProductAdmin']))
    async approveProduct(@Req() req: Request, @Param('id') id: string, @Query() approveDto: ProductTokenApproveDto) {
        
    }

    @Patch('/products/block/:id')
    @UseGuards(new RolesGuard(['ProductAdmin']))
    async blockProduct(@Req() req: Request, @Param('id') id: string, @Query() query: ProductBlockDto) {
        
    }

    @Patch('/product/:id/owner/:uid')
    @UseGuards(new RolesGuard(['ProductAdmin']))
    async update(@Param('id') id: string, @Param('uid') uid: string) {
        
    }

    // REMOVED

}
