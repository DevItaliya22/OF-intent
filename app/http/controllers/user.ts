import { Controller, Get, Param, Post, Req, Request, Res, Response, Transformable } from '@intentjs/core';
import { UserService } from "app/services/userServives";

@Controller("/user")
export class UserController extends Transformable{
    constructor(private readonly service: UserService) {
        super();
    }

    @Get("")
    async getUsers(@Req() req: Request, @Res() res: Response) {
      const users = await this.service.getUsers();
      if (!users) {
        return res.status(404).json({ message: 'No users found' });
      }
      return res.status(200).json(users); 
    }

    @Get("/:id")
    async getUsersList(@Param("id") id: string) {
      const user = await this.service.getUserById(id);
      console.log(id);

      return user
    }
}

