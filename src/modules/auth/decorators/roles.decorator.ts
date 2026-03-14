import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

/**
 * Set required roles for a resolver. Use with RolesGuard (after GqlAuthGuard).
 * Example: @Roles('ADMIN', 'STAFF')
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
