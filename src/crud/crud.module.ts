import { Module } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { RolesController } from './roles/roles.controller';
import { RolesService } from './roles/roles.service';
import { RolesModule } from './roles/roles.module';

@Module({
  providers: [UsersService, RolesService],
  controllers: [UsersController, RolesController],
  imports: [RolesModule],
})
export class CrudModule {}
