import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product, ProductSchema } from './schemas/product.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../users/user.module';
import { UtilsModule } from '../utils/utils.module';
import { CurrencyModule } from '../currencies/currency.module';
import { CachedProduct, CahedProductSchema } from './schemas/cached_product.schema';

@Module({
    imports: [
        UserModule, UtilsModule, CurrencyModule,
        MongooseModule.forFeature([
            { name: Product.name, schema: ProductSchema }, { name: CachedProduct.name, schema: CahedProductSchema }
        ])
    ],
    controllers: [ProductController],
    providers: [ProductService],
    exports: [ProductService]
})
export class ProductModule {
}
