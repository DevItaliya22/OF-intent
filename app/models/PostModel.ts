import { BaseModel } from '@intentjs/core';

export class PostModel extends BaseModel {
  static tableName = 'posts';

  id?: string;
  userId: string;  // Foreign key to Users table
  text: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  likesCount?: number;
  commentsCount?: number;

  comments?: PostModel[];
}

