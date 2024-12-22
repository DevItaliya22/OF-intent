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
    try {
      const user = await this.users.getWhere({ id });
      console.log(user);
      return user;
    } catch (error) {
      console.log(error);
      return {message : "Error fetching user"};
    }
  }
}
