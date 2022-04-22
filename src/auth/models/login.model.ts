import { ObjectType } from '@nestjs/graphql';
import { Token } from './token.model';

@ObjectType()
export class UserProfileModel {
  name: string;
  email: string;
}

export class UserCustomDataModel {
  roles: string[];
  teams: string[];
}
@ObjectType()
export class LoginModel extends Token {
  id: string;
  profile: UserProfileModel;
  customData: UserCustomDataModel;
  // @Field(() => GraphQLJWT, { description: 'JWT access token' })
  // accessToken: string;
}
