import { Injectable } from '@nestjs/common';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  private readonly orders: Order[] = [
    { id: 1, userId: 1, total: 29.98 },
    { id: 2, userId: 1, total: 9.99 },
  ];

  findAll(): Order[] {
    return this.orders;
  }

  findOne(id: number): Order | undefined {
    return this.orders.find((o) => o.id === id);
  }

  findByUser(userId: number): Order[] {
    return this.orders.filter((o) => o.userId === userId);
  }
}
