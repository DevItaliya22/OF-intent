import { DatabaseRepository, Injectable, InjectModel } from '@intentjs/core';
import { PostModel } from 'app/models/PostModel';

@Injectable()
export class UserDbRepository extends DatabaseRepository<PostModel> {
  @InjectModel(PostModel)
  model: PostModel;
}
