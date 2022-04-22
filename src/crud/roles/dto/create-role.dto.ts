import { Param, Query } from '@nestjs/common';
import { Args, Field } from '@nestjs/graphql';

export class CreateRoleDto {
  @Field()
  name: string;
  @Field()
  ownerId: string;
}
