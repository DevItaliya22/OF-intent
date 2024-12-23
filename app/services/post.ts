import { ConfigService, Inject, Injectable, Unauthorized, ValidationFailed } from '@intentjs/core';
import { NotificationDbRepository } from 'app/repositories/notificationDbRepository';
import { PostDbRepository } from 'app/repositories/postDbRepository';
import { UserDbRepository } from 'app/repositories/userDbRepository';

@Injectable()
export class PostService {
  constructor(
    private config: ConfigService,
    @Inject('USER_DB_REPO') private users: UserDbRepository,
    @Inject('POST_DB_REPO') private notifications: PostDbRepository,
  ) {}

  async createPost(payload: any): Promise<{ message: string; success: boolean }> {
    console.log(payload, "in services ");
    return ({message:"Post created successfully", success:true});
  }
 
}
