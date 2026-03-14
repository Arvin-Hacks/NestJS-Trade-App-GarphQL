import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateProductInput } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [Product], { name: 'products' })
  products() {
    return this.productService.findAll();
  }

  @Query(() => Product, { name: 'product', nullable: true })
  product(@Args('id') id: string) {
    return this.productService.findOne(id);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('ADMIN', 'STAFF')
  @Mutation(() => Product)
  createProduct(@Args('input') input: CreateProductInput) {
    return this.productService.create(input);
  }
}
