import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    console.log('graphql user?', req.user);
    // const fakeUser = {
    //   // roles: ['ADMIN_UPDATE_OWN_VIDEO', 'USER_CREATE_ANY_VIDEO'],
    //   roles: ['USER_READ'],
    //   username: '@fake',
    // };
    // req.user = fakeUser;
    return true;
  }
}
