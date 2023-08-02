import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Delete, Get, HttpException, Param, Patch, Post, Query, Req, Request } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { WalletService } from './wallet.service';
import { WalletDto, WalletType } from './dto/wallet.dto';

@ApiTags('wallet')
@Controller('api/v1/wallet')
export class WalletController {
    constructor(
        private readonly userService: UserService, 
        private readonly walletService: WalletService
        ) {}

    @Get() 
    async getAllWallets() {
        return await this.walletService.find({});
    }

    @Get(':uid')
    async getWallet(@Param('uid') uid: string) {
        return await this.walletService.find({ uid });
    }

    @Post()
    @ApiBearerAuth('access-token')
    async createWallet(@Req() req: Request, @Query() data: WalletDto) {
        const uid = req['user'].uid;
        const wallet = await this.walletService.findOne({ uid, type: data.type });
        if (wallet) 
            throw new HttpException({ message: `Wallet already exists: ${ wallet._id }` }, 409);

        return await this.walletService.create({ ...data, uid });
    }

    @Patch()
    @ApiBearerAuth('access-token')
    async updateWallet(@Req() req: Request, @Query() query: WalletDto) {
        const uid = req['user'].uid;

        return await this.walletService.findOneAndUpdate({ uid, type: query.type }, { ...query });
    }

    @Delete()
    @ApiBearerAuth('access-token') @ApiOperation({ description: 'DELETE SELF WALLET!!!'  })
    async deleteWallet(@Req() req: Request, @Query() query: WalletType) {
        const uid = req['user'].uid;

        return `DELETED: \n ${ await this.walletService.findOneAndRemove({ uid, type: query.type }) }`;
    }

    // REMOVED

}
