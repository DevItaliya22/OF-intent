// import { Controller, Get, Post, Req, Request, Res, Response, Transformable } from '@intentjs/core';
// import { PostService } from 'app/services/post';

// @Controller("/post")
// export class PostController {
//     // constructor(private posts : PostService) {
//     //     super();
//     // }

//   @Post("")
//   async createPost(@Req() req: Request, @Res() res: Response) {
//     // const payload = await req.all();
//     // const post = await this.posts.createPost(payload);
//     // return res.json(post);
//     return res.json({ message: 'Post created successfully' });
//   }
  
// }

import { Controller, Get, Req, Request, Res, Response } from '@intentjs/core';
// 1

@Controller("/post")
export class PostController {
  @Get("/")
  async getHeatlhCheck(@Req() req: Request, @Res() res: Response) {
    return res.json({ message: 'Server is up and running' });
  }
}

// \