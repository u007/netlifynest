import { AppRoles } from './app.roles';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);
    const req = context.switchToHttp().getRequest();
    const { user } = req;
    if (!user) {
      console.log('not logged in');
      return false;
    }
    user.rawRoles = [...user.roles];
    // test only - TODO read from jwt or db
    // TODO find roles and assign roles (rights) here
    if (
      user.roles.indexOf('superadmin') > -1 ||
      user.roles.indexOf('admin') > -1
    ) {
      req.user.roles = [AppRoles.ADMIN];
    }
    console.log('user?', user);

    // const fakeUser = {
    //   // roles: ['ADMIN_UPDATE_OWN_VIDEO', 'USER_CREATE_ANY_VIDEO'],
    //   roles: ['MANAGE_USER_READ'],
    //   username: '@fake',
    // };
    // req.user = fakeUser;
    return true;
  }
}
