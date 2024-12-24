import { Body, Controller, Delete, Get, Post, Put, Req, Request, Res, Response, Transformable } from '@intentjs/core';
import { PostService } from 'app/services/post';
import { UpdatePostDto } from 'app/validators/post';

// 7 all routes checked and working
@Controller("/post")
export class PostController extends Transformable {
    constructor(private posts : PostService) {
        super();
    }
// create a post on logged in user
  @Post("/")
  async createPost(@Body() body: Request,@Req() req: Request, @Res() res: Response) {
    // here we can add image upload logic
    const userEmail =  (req as any).user.email;
    const post = await this.posts.createPost(userEmail,body);
    return res.json(post);
  }
// if logged in user wants to delete his post
  @Delete("/:id")
  async deletePost(@Req() req: Request, @Res() res: Response) {
    const post = await this.posts.deletePost(req.params.id as string);
    return res.json(post);
  }

// get all post of :userid id 
  @Get("/user/:id")
  async getPosts(@Req() req: Request, @Res() res: Response) {
    const posts = await this.posts.getAllPostsOfUser(req.params.id as string);
    return res.json(posts);
  }

//get post with :id id 
  @Get("/:id")
  async getPost(@Req() req: Request, @Res() res: Response) {
    const post = await this.posts.getPostById(req.params.id as string);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.json(post);
  }

// update post with :id id
  @Put("/:id")
  async updatePost(@Body() dto:UpdatePostDto,@Req() req: Request, @Res() res: Response) {
    const post = await this.posts.updatePost(req.params.id as string, dto.text);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.json(post);
  }
// here there is no validation for max likes and -ve likes but ig thats ez to implement
  // inc like of post with id :id
  @Post("/like/:id")
  async likePost(@Req() req: Request, @Res() res: Response) {
    return this.posts.likePost(req.params.id as string);
  }

  // dec like of post with id :id
  @Post("/dislike/:id")
  async dislikePost(@Req() req: Request, @Res() res: Response) {
    return this.posts.likePost(req.params.id as string);
  }
}
