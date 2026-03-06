import { Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  private readonly products: Product[] = [
    { id: 1, name: 'Product A', price: 9.99 },
    { id: 2, name: 'Product B', price: 19.99 },
  ];

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product | undefined {
    return this.products.find((p) => p.id === id);
  }
}
