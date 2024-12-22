import { BaseModel } from '@intentjs/core';

export class NotificationModel extends BaseModel {
  static tableName = 'notifications';

  id?: string;
  userId: string;  // Foreign key to Users table
  postId: string;  // Foreign key to Posts table
  type: string;    // Type of notification (e.g., reply, like)
  message: string; // Message content
  readAt?: Date;   // When the notification was read
  createdAt: Date;
}
