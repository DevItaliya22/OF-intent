import { DatabaseRepository, Injectable, InjectModel } from '@intentjs/core';
import { NotificationModel } from 'app/models/NotificationModel';

@Injectable()
export class UserDbRepository extends DatabaseRepository<NotificationModel> {
  @InjectModel(NotificationModel)
  model: NotificationModel;
}
