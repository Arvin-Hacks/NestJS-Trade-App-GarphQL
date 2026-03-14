import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { OrderLoader } from './order.loader';
import { OrderResolver } from './order.resolver';
import { OrderService } from './order.service';

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [OrderService, OrderLoader, OrderResolver],
  exports: [OrderService, OrderLoader],
})
export class OrderModule {}
