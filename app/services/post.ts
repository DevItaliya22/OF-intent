import { ConfigService, Inject, Injectable, Unauthorized, ValidationFailed } from '@intentjs/core';
import { NotificationDbRepository } from 'app/repositories/notificationDbRepository';
import { PostDbRepository } from 'app/repositories/postDbRepository';
import { UserDbRepository } from 'app/repositories/userDbRepository';
import { ulid } from 'ulid';

@Injectable()
export class PostService {
  constructor(
    private config: ConfigService,
    @Inject('USER_DB_REPO') private users: UserDbRepository,
    @Inject('POST_DB_REPO') private posts: PostDbRepository,
  ) {}

  async createPost(email:string,payload: any): Promise<{ message: string; success: boolean,post?:any }> {
    const {text} = payload;
    if (!text) {
      return ({message:"Text is required", success:false});
    }
    const user = await this.users.firstWhere({ email });
    if (!user) {
      throw new Unauthorized();
    }
    const post = await this.posts.create({ id:ulid(),userId:user.id, text, createdAt: new Date(), updatedAt: new Date() });

    return ({message:"Post created successfully", success:true,post});
  }

  async deletePost(id: string): Promise<{ message: string; success: boolean }> {

    const post = await this.posts.getWhere({ id });
    if (!post) {
      return ({message:"Post not found", success:false});
    }
    await this.posts.deleteWhere({ id });
    return ({message:"Post deleted successfully", success:true});
  }
 
  async getAllPostsOfUser(userId:string): Promise<any[]> {
    const posts = await this.posts.getWhere({ userId });

    return posts;
  }

  async getPostById(id: string): Promise<any> {
    const post = await this.posts.getWhere({ id });
    if (!post) {
      return null; 
    }
    return post;
  }

  async updatePost(id: string, text: string): Promise<{ message: string; success: boolean,post?:any }> {
    const post = await this.posts.getWhere({ id });
    if (!post) {
      return null; 
    }
    const newPost = await this.posts.updateWhere({ id }, { text, updatedAt: new Date() });
    return {message:"Post updated successfully", success:true,post:newPost};
  }

  async likePost(id: string): Promise<{ message: string; success: boolean }> {
    const post = await this.posts.getWhere({ id });
    if (!post) {
      return ({message:"Post not found", success:false});
    }
    await this.posts.updateWhere({ id }, { likesCount: post[0].likesCount + 1 });
    return ({message:"Post liked", success:true});
  }

  async dislikePost(id: string): Promise<{ message: string; success: boolean }> {
    const post = await this.posts.getWhere({ id });
    if (!post) {
      return ({message:"Post not found", success:false});
    }
    await this.posts.updateWhere({ id }, { likesCount: post[0].likesCount - 1 });
    return ({message:"Post disliked", success:true});
  }
}
