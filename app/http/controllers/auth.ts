import {
  Body,
  BufferBody,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Transformable,
  Validate,
} from '@intentjs/core';
import { AuthService } from 'app/services/auth';
import {
  LoginDto,
  RegisterDto,
} from 'app/validators/auth';

@Controller('/auth')
export class AuthController extends Transformable {
  constructor(private auth: AuthService) {
    super();
  }
    @Post('/register')
    // @Validate(RegisterDto)
    async register(@Body() dto:RegisterDto , @Req() req:Request,@Query() queryParams: Record<string, any>,@BufferBody() bufferbody:any) {
      console.log(await bufferbody);
      console.log(dto);
      console.log(req.body);
      console.log(queryParams);
      if(!dto) return {message : "No data found"};
      const user = await this.auth.register(dto);
      return user;
    }
  
    @Post('login')
    @Validate(LoginDto)
    async login(@Body() dto: LoginDto) {
      const user = await this.auth.login(dto);
      return user;
    }
  
}
