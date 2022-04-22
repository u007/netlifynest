import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { ACGuard, UseRoles } from 'nest-access-control';

@Controller('/crud/v1/roles')
@UseGuards(JwtAuthGuard, ACGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @UseRoles({
    resource: 'role',
    action: 'create',
    possession: 'any',
  })
  create(@Body() createRoleDto: CreateRoleDto) {
    console.log('body', createRoleDto);
    return this.rolesService.create(createRoleDto);
  }

  @UseRoles({
    resource: 'role',
    action: 'read',
    possession: 'any',
  })
  @Get()
  @UseRoles({
    resource: 'role',
    action: 'create',
    possession: 'any',
  })
  findAll(
    @Query('filters') filters: Prisma.RoleWhereInput = {},
    @Query('orderby') orderBy: Prisma.RoleOrderByWithRelationInput,
    @Query('page') page = 1,
    @Query('perpage') perPage = 10
  ) {
    console.log(
      'filters',
      filters,
      'orderBy',
      orderBy,
      'page',
      page,
      'perPage',
      perPage
    );
    return this.rolesService.findAll({
      where: filters,
      orderBy,
      limit: +perPage,
      offset: (+page - 1) * +perPage,
    });
  }

  @UseRoles({
    resource: 'role',
    action: 'read',
    possession: 'any',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  @UseRoles({
    resource: 'role',
    action: 'update',
    possession: 'any',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @UseRoles({
    resource: 'role',
    action: 'delete',
    possession: 'any',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(id);
  }
}
