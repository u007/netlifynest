import {
  Resolver,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './models/auth.model';
import { Token } from './models/token.model';
import { LoginInput } from './dto/login.input';
import { SignupInput } from './dto/signup.input';
import { RefreshTokenInput } from './dto/refresh-token.input';
import { Controller, Get, Post } from '@nestjs/common';

@Controller('auth')
@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly auth: AuthService) {}

  @Mutation(() => Auth)
  @Post('create')
  async signup(@Args('data') data: SignupInput) {
    data.email = data.email.toLowerCase();
    const res = await this.auth.createUser(data);
    return res;
  }

  @Mutation(() => Auth)
  @Post('login')
  async login(@Args('data') { email, password }: LoginInput) {
    const res = await this.auth.login(email.toLowerCase(), password);

    return res;
  }

  @Mutation(() => Token)
  @Post('refresh')
  async refreshToken(@Args() { token }: RefreshTokenInput) {
    return this.auth.refreshToken(token);
  }

  @Get('me')
  @ResolveField('user')
  async user(@Parent() auth: Auth) {
    return await this.auth.getUserFromToken(auth.accessToken);
  }
}
