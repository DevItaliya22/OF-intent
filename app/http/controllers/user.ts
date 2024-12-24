import { Controller, Get, Param, Post, Req, Request, Res, Response, Transformable } from '@intentjs/core';
import { UserService } from "app/services/userServives";

// 4 all routes checked and working
@Controller("/user")
export class UserController extends Transformable {
  constructor(private readonly service: UserService) {
    super();
  }
// get all users (can use limit / prefrences to get only few users)
  @Get("")
  async getUsers(@Req() req: Request, @Res() res: Response) {
    const users = await this.service.getUsers();
    if (!users) {
      return res.status(404).json({ message: 'No users found' });
    }
    return res.status(200).json(users);
  }
// get all the info of :id user
  @Get("/:id")
  async getUsersList(@Param("id") id: string) {
    const user = await this.service.getUserById(id);
    console.log(id);

    return user;
  }

  // logged in user follows :id user
  @Post("/follow/:id")
  async follow(
    @Req() req: Request,
  ) {
    const userEmail = (req as any).user.email;
    const res = await this.service.follow(userEmail, req.params.id as string);

    return res;
  }

  // logged in user unfollows :id user
  @Post("/unfollow/:id")
  async unfollow(
    @Req() req: Request,
  ) {

    const userEmail = (req as any).user.email;
    const res = await this.service.unfollow(userEmail, req.params.id as string);

    return res;
  }
}

