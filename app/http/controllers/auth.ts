import {
  Body,
  BufferBody,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Request,
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
    async register(@Body() dto:RegisterDto , @Req() req:Request) {
      const payload2 = await req.all();
      console.log(payload2)
      console.log(dto)
      
      dto.email = payload2.email;
      dto.firstName = payload2.firstname;
      dto.lastName = payload2.lastname;
      dto.password = payload2.password

      const user = await this.auth.register(dto);
      return user;
    }
  
    @Post('login')
    @Validate(LoginDto)
    async login(@Body() dto: LoginDto,@Req() req:Request) {
      const payload2 = await req.all();
      console.log(payload2)
      console.log(dto)
      
      dto.email = payload2.email;
      dto.password = payload2.password

      const user = await this.auth.login(dto);
      return user;
    }
  
}
