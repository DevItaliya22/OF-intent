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

  async getAllComments(id: string): Promise<any[]> {  
    const post = await this.posts.getWhere({ id });
    if (!post) {
      return null; 
    }
    //  I know this is not the right way to get comments on a post but i could not find any method to get comments on a post only , and getWhere({isCommentOnPostId:id}) is giving error , might be it will be fixed in future
    const comments = await this.posts.all();
    const commentonPost = comments.map((comment)=> comment.isCommentOnPostId === post[0].id);
    return commentonPost;
  }

  async addComment(email:string , id: string, text: string): Promise<{ message: string; success: boolean,comment?:any }> { 
    const post = await this.posts.getWhere({ id });
    if (!post) {
      return null; 
    }
    const userAddingComment = await this.users.getWhere({ email });
    const comment = await this.posts.create({ id:ulid(),userId:userAddingComment[0].id, text, createdAt: new Date(), updatedAt: new Date(),isCommentOnPostId:post[0].id });

    const updateCount = await this.posts.updateWhere({ id },{commentsCount:post[0].commentsCount+1});

    return {message:"Comment added successfully", success:true,comment};
  }
  async deleteComment(id: string): Promise<{ message: string; success: boolean }> {
    const comment = await this.posts.getWhere({ id });
    if (!comment) {
      return ({message:"Comment not found", success:false});
    }
    await this.posts.deleteWhere({ id });
    await this.posts.updateWhere({ id },{commentsCount:comment[0].commentsCount-1});
    return ({message:"Comment deleted successfully", success:true});
  }
}
