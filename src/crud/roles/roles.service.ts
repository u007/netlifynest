// import { RoleOrderByWithRelationInput } from '.prisma/client/index.d';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, prisma } from '@prisma/client';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'nestjs-prisma';
import { UseRoles } from 'nest-access-control';

type findAllInput = {
  where: Prisma.RoleWhereInput;
  limit: number;
  offset: number;
  orderBy?: Prisma.RoleOrderByWithRelationInput;
};

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createRoleDto: CreateRoleDto) {
    return this.prisma.role.create({ data: createRoleDto });
  }

  async findAll({ where, orderBy, offset, limit }: findAllInput) {
    const [list, count] = await Promise.all([
      this.prisma.role.findMany({
        where,
        orderBy,
        skip: offset,
        take: limit,
      }),

      this.prisma.role.count({
        where,
      }),
    ]);

    return { list, count };
  }

  async findOne(id: string) {
    const res = await this.prisma.role.findUnique({ where: { id } });
    if (!res) {
      throw new NotFoundException('404');
    }
    return res;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    const res = await this.prisma.role.findUnique({ where: { id } });
    if (!res) {
      throw new NotFoundException('404');
    }
    return this.prisma.role.update({ where: { id }, data: updateRoleDto });
  }

  async remove(id: string) {
    const res = await this.prisma.role.findUnique({ where: { id } });
    if (!res) {
      throw new NotFoundException('404');
    }
    return this.prisma.role.delete({ where: { id } });
  }
}
