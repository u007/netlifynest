import { Controller, Get } from '@nestjs/common';
// import { Controller, Get, UseGuards } from '@nestjs/common';
import { UseRoles } from 'nest-access-control';
// import { ACGuard, UseRoles } from 'nest-access-control';
// import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('/crud/v1/users')
export class UsersController {
  // @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'user',
    action: 'read',
    possession: 'any',
  })
  @Get()
  root() {
    //@UserRoles() userRoles: any) {
    return {
      success: 1,
    };
    // return this.appService.root(userRoles);
  }
}
