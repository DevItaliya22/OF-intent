import { DatabaseRepository, Injectable, InjectModel } from '@intentjs/core';
import { FollowModel } from 'app/models/FollowModel';

@Injectable()
export class FollowDbRepository extends DatabaseRepository<FollowModel> {
  @InjectModel(FollowModel)
  model: FollowModel;
}
