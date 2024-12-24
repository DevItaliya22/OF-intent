import { Controller, Get, Req, Request, Res, Response } from '@intentjs/core';

// 1 all routes checked and working
@Controller()
export class MainController {
  @Get("")
  async getHeatlhCheck(@Req() req: Request, @Res() res: Response) {
    return res.json({ message: 'Server is up and running' });
  }
}