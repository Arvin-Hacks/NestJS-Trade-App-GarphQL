import { Module } from '@nestjs/common';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

@Module({
  providers: [ProductService, ProductResolver],
  exports: [ProductService],
})
export class ProductModule {}
