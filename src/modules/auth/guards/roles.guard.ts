import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import type { GqlContext } from '../../../common/types/gql-context';
import { ROLES_KEY } from '../decorators/roles.decorator';

/** Request user shape set by JWT strategy (must have role). */
interface RequestUser {
  id: string;
  role: string;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles?.length) {
      return true;
    }
    const ctx = GqlExecutionContext.create(context);
    const gqlContext = ctx.getContext<GqlContext>();
    const user = gqlContext.req?.user as RequestUser | undefined;
    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }
    const hasRole = requiredRoles.includes(user.role);
    if (!hasRole) {
      throw new ForbiddenException(
        `Required role(s): ${requiredRoles.join(', ')}`,
      );
    }
    return true;
  }
}
