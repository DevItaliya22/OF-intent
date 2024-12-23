import { DatabaseRepository, Injectable, InjectModel } from '@intentjs/core';
import { PostModel } from 'app/models/PostModel';

@Injectable()
export class PostDbRepository extends DatabaseRepository<PostModel> {
  @InjectModel(PostModel)
  model: PostModel;
}
