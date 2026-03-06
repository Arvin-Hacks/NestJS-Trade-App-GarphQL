import { Query, Resolver } from '@nestjs/graphql';

/**
 * Minimal root resolver so GraphQL schema has a Query type (required for code-first).
 * Phase 2 will add user, product, and order queries here or in their own modules.
 */
@Resolver()
export class AppResolver {
  @Query(() => String, {
    name: 'hello',
    description: 'Health check / placeholder root query for Phase 1',
  })
  hello(): string {
    return 'GraphQL API is running';
  }
}
