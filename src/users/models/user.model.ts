import {
  ObjectType,
  registerEnumType,
  HideField,
  Field,
} from '@nestjs/graphql';
import { Post } from 'src/posts/models/post.model';
import { BaseModel } from 'src/common/models/base.model';
import { Role } from '@prisma/client';

// registerEnumType(Role, {
//   name: 'Role',
//   description: 'User role',
// });

@ObjectType()
export class UserProfile {
  name: string;
  email: string;
}

@ObjectType()
export class UserCustomData {
  roles: string[];
  teams: string[];
}

@ObjectType()
export class User extends BaseModel {
  email: string;
  firstname?: string;
  lastname?: string;

  profile: UserProfile;

  customData: UserCustomData;

  @HideField()
  password?: string;

  posts?: Post[];
}
