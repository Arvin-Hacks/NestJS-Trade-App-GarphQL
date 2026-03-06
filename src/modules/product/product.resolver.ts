import { Args, Int, Query, Resolver } from '@nestjs/graphql';
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
  product(@Args('id', { type: () => Int }) id: number) {
    return this.productService.findOne(id);
  }
}
