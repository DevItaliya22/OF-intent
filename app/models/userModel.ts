import { BaseModel } from '@intentjs/core';

export class UserModel extends BaseModel {
  static tableName = 'users';

  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  emailVerifiedAt?: Date;
  profilePictureUrl?: string;
  bannerPictureUrl?: string;
  bio?: string;
  followersCount?: number;
  followingCount?: number;
  postsCount?: number;
  followers?: UserModel[];
  following?: UserModel[];

  token?: string;
}
