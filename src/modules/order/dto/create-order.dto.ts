import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  @Field(() => Int)
  userId: number;

  @Field(() => [Int], { description: 'Product IDs' })
  productIds: number[];
}
