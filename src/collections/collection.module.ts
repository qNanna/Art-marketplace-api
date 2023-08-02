import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UtilsModule } from 'src/utils/utils.module';
import { CollectionController } from './collection.controller';
import { CollectionService } from './collection.service';
import { ArtCollectionSchema, ArtCollection } from './schemas/collection.schema';
import { ProductModule } from '../products/product.module';

@Module({
    imports: [
        UtilsModule, ProductModule,
        MongooseModule.forFeature([{ name: ArtCollection.name, schema: ArtCollectionSchema }])
    ],
    controllers: [CollectionController],
    providers: [CollectionService], 
    exports: [CollectionService]
})
export class CollectionModule {}
