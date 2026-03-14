import { UseGuards } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { OrderLoader } from '../order/order.loader';
import { Order } from '../order/entities/order.entity';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly orderLoader: OrderLoader,
  ) {}

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('ADMIN', 'STAFF')
  @Query(() => [User], { name: 'users' })
  users() {
    return this.userService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { name: 'user', nullable: true })
  user(@Args('id') id: string) {
    return this.userService.findOne(id);
  }

  @ResolveField(() => [Order])
  orders(@Parent() user: User) {
    return this.orderLoader.load(user.id);
  }
}
