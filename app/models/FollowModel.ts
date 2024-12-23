import { BaseModel } from '@intentjs/core';

export class FollowModel extends BaseModel {
  static tableName = 'follows';

  id?: string;
  followerId: string; 
  followingId: string;
  createdAt: Date;
}
