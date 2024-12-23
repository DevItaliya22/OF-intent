import { __, Inject, Injectable } from '@intentjs/core';
import { FollowDbRepository } from 'app/repositories/followDbRepository';
import { UserDbRepository } from 'app/repositories/userDbRepository';
import { ulid } from 'ulid';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_DB_REPO') private readonly users: UserDbRepository,
    @Inject('FOLLOW_DB_REPO') private follows: FollowDbRepository,
  ) {}

  async getUsers() {
    const users = await this.users.all();
    console.log(users);
    return users;
  }

  async getUserById(id: string) {
    try {
      const user = await this.users.getWhere({ id });
      console.log(user);
      return user;
    } catch (error) {
      console.log(error);
      return {message : "Error fetching user"};
    }
  }

  async follow(email: string, id: string): Promise<{ message: string; success: boolean }> {
    console.log(await this.follows.all())
    const user = await this.users.firstWhere({ email });
    if (!user) return {message:"Not auth ", success:false}
    
    const userToFollow = await this.users.firstWhere({ id });
    if (!userToFollow) return {message:"User not found", success:false};
  
    if (user.id === id) {
      return {message:"Cannot follow yourself", success:false};
    }

    const existingFollowed = await this.follows.exists({ followerId: user.id, followingId: userToFollow.id });
    if(existingFollowed) {
      return {message:"Already followed", success:false};
    }

    const res1= await this.users.updateWhere({ email }, { followingCount: user.followingCount + 1 });
    const res2= await this.users.updateWhere({ id }, { followersCount: userToFollow.followersCount + 1 });
    const res3= await this.follows.create({id:ulid(), followerId: user.id, followingId: userToFollow.id });
    return {message:"Followed", success:true};
  }

  async unfollow(email: string, id: string): Promise<{ message: string; success: boolean }> {
    console.log(await this.follows.all())
    const user = await this.users.firstWhere({ email });
    if (!user) return {message:"Not auth ", success:false}
    
    const userToFollow = await this.users.firstWhere({ id });
    if (!userToFollow) return {message:"User not found", success:false};
  
    if (user.id === id) {
      return {message:"Cannot unfollow yourself", success:false};
    }

    const existingFollowed = await this.follows.exists({ followerId: user.id, followingId: userToFollow.id });
    console.log(existingFollowed)
    if(!existingFollowed) {
      return {message:"User never followed", success:false};
    }

    const res1= await this.users.updateWhere({ email }, { followingCount: user.followingCount - 1 });
    const res2= await this.users.updateWhere({ id }, { followersCount: userToFollow.followersCount - 1 });
    const res3= await this.follows.deleteWhere({followerId: user.id, followingId: userToFollow.id });
    return {message:"UnFollowed", success:true};
  }
}
