import { Body, Controller, Post, HttpException, Get, 
    Param, Query, Patch, HttpCode, Req, Request } from '@nestjs/common';
import { ProductDto, OwnedByRequest, ApproveDto, ProdctPartialDto } from './dto/product.dto';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { UserService } from '../users/user.service';
import { BlockChain } from '../utils/blockchain';
import { Product } from './schemas/product.schema';

@ApiTags('product') 
@Controller('api/v1/product')
export class ProductController {
    constructor(
        private readonly productService: ProductService,
        private readonly userService: UserService,
        private readonly blockChain: BlockChain
    ) {}

    @Get()
    async getAllProducts(@Query() query: ApproveDto) {

    }
    
    @Get(':id')
    async getProduct(@Param('id') id: string) {
        const remoteProducts = await this.productService.find_aggregate({ _id: Product.converToObjectId(id) })

        return await this.productService.filterProducts(this.blockChain, remoteProducts);;
    }

    @Get('user/:uid')
    async getUserProducts(@Param('uid') uid: string, @Query() query: ApproveDto) {
        const { offset, limit, approved } = query;

        const remoteProducts = await this.productService.find_aggregate({ ownedBy: uid }, offset, limit)
        const products = await this.productService.filterProducts(this.blockChain, remoteProducts);
    
        return { remoteProducts, products }
    }

    @Post() @HttpCode(201)
    @ApiBearerAuth('access-token')
    async create(@Body() data: ProductDto, @Req() req: Request) {
        return await this.productService.create({ ...data, createdBy: req['user'].uid });
    }

    @Patch(':id')
    @ApiBearerAuth('access-token') @ApiOperation({ description: 'BE CAREFUL WITH NEW PRODUCT OBJECT!!!' })
    async updateProduct(@Param('id') id: string, @Body() data: ProdctPartialDto, @Req() req: Request) {
        const uid = req['user'].uid;
        
        return await this.productService.findOne({ _id: id });
    }

    @Patch('like/:id')
    @ApiBearerAuth('access-token')
    async likeProduct(@Param('id') id: string, @Req() req: Request) {

    }

    @Patch('setOwner/:id')
    @ApiBearerAuth('access-token') @ApiExcludeEndpoint() // ?: need?
    async update(@Param('id') id: string, @Query() data: OwnedByRequest) {
        return await this.productService.findOneAndUpdate({ _id: id }, data);
    }

    // REMOVED

}
