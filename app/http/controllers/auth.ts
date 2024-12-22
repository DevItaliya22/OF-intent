import {
  Accepts,
  Body,
  BufferBody,
  Controller,
  Get,
  Header,
  Post,
  Query,
  Req,
  Request,
  Transformable,
  Unauthorized,
  Validate,
} from '@intentjs/core';
import { AuthService } from 'app/services/auth';
import {
  LoginDto,
  RegisterDto,
  ResetPasswordDto,
} from 'app/validators/auth';

@Controller('/auth')
export class AuthController extends Transformable {
  constructor(private auth: AuthService) {
    super();
  }
    // we cant validate as we are not getting body due to some issue in the core , but checked
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
  
    // we cant validate as we are not getting body due to some issue in the core , but checked
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

  @Post('reset-password')
  async resetPassword(
    @Body() dto: ResetPasswordDto,
    @Req() req: Request,
    @Accepts() accepts: string,
  ) {
    const authHeader = req.header("Authorization");

    const payload =await req.all();

    dto.currentPassword = payload.currentPassword;
    dto.newPassword = payload.newPassword;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {message : "Invalid token"}
    }

    const token = authHeader.split(' ')[1];
    await this.auth.resetPassword(token, dto.currentPassword, dto.newPassword);

    return {
      message: 'Password reset successfully.',
    };
  }
}
