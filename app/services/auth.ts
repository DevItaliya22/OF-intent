

import { ConfigService, Inject, Injectable, Unauthorized, ValidationFailed } from '@intentjs/core';
import { UserModel } from 'app/models/userModel';
import { UserDbRepository } from 'app/repositories/userDbRepository';
import { LoginDto, RegisterDto } from 'app/validators/auth';
import { hashSync, compareSync } from 'bcrypt';
import { sign,verify } from 'jsonwebtoken';
import {  ulid } from 'ulid';

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
    @Inject('USER_DB_REPO') private users: UserDbRepository,
  ) {}

  async register(dto: RegisterDto): Promise<UserModel> {
    console.log(dto, "in services ");

    const existingUser = await this.users.firstWhere({ email: dto.email }, false);
    if (existingUser) {
      throw new ValidationFailed({
        email: ['Email is already used by another account!'],
      });
    }

    const userId = ulid();
    const token = this.makeToken({sub:userId, email: dto.email});

    const user = await this.users.create({
      id: userId,
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      password: hashSync(dto.password, 10),
      token: token,
    });

    console.log(user);
    return user;
  }

  async login(dto: LoginDto): Promise<UserModel> {

    const user = await this.users.firstWhere({ email: dto.email });
    if (!compareSync(dto.password, user.password)) {
      throw new Unauthorized();
    }

    user.token = this.makeToken({ sub: user.id, email: user.email });

    const updateUser = await this.users.updateWhere({ email: user.email }, { token: user.token });
    return user;
  }

  async resetPassword(token:string , currentPassword : string, newPassword: string): Promise<void>
  {
    const payload = this.verifyToken(token);
    const user = await this.users.firstWhere({ email: payload.email });
    if (!compareSync(currentPassword, user.password)) {
      throw new Unauthorized();
    }
    const hashedPassword = hashSync(newPassword, 10);
    await this.users.updateWhere({ email: user.email }, { password: hashedPassword });
  }

  private verifyToken(token: string): any {
    try {
      return verify(token, this.config.get<string>('auth.secret') as string, {
        issuer: this.config.get<string>('app.url'), // means the token is issued by this url (means by that xyz username)
      });
    } catch (err) {
      throw new Unauthorized();
    }
  }

  private makeToken(payload: Record<string, any>): string {
    return sign(payload, this.config.get<string>('auth.secret') as string, {
      issuer: this.config.get<string>('app.url'),
      expiresIn: this.config.get<string>('auth.ttl'),
    });
  }
}
