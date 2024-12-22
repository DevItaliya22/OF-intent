import { __, Inject, Injectable } from '@intentjs/core';
import { UserDbRepository } from 'app/repositories/userDbRepository';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_DB_REPO') private readonly users: UserDbRepository,
  ) {}

  async getUsers() {
    const users = await this.users.all();
    console.log(users);
    return users;
  }

  async getUserById(id: string) {
    const user = await this.users.firstWhere({ id });
    console.log(user);
    return user;
  }
}
