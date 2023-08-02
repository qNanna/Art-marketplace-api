import { Body, Controller, Get, HttpException, Param, Patch, Post, Query, Req, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ArtCollectionDto, ArtCollectionPartialDto, PopulateDto, PopulateQueryDto } from './dto/collection.dto';
import { CollectionService } from './collection.service';
import { ArtCollection } from './schemas/collection.schema';

@ApiTags('collection') 

@Controller('api/v1/products/collection')
export class CollectionController {
    constructor(private readonly collectionService: CollectionService) {}

    @Post()
    @ApiBearerAuth('access-token') 
    async create(@Req() req: Request, @Body() body: ArtCollectionDto) {
        const uid = req['user'].uid;
        return await this.collectionService.create({ ...body, createdBy: uid });
    }

    @Get()
    async getCollection(@Query() query: PopulateDto) {

    }

    @Get(':id')
    async getById(@Param('id') id: string, @Query() query: PopulateQueryDto) {
 
    }

    @Get('user/:uid')
    async getCoolectionsByUid(@Param('uid') uid: string, @Query() query: PopulateDto) {

    }

    @Patch(':id')
    @ApiBearerAuth('access-token')
    async update(@Req() req: Request, @Param('id') id: string, @Body() body: ArtCollectionPartialDto) {

    }

    // REMOVED

}
