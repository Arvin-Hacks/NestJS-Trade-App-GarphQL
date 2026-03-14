import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

@Module({
  imports: [AuthModule],
  providers: [ProductService, ProductResolver],
  exports: [ProductService],
})
export class ProductModule {}
