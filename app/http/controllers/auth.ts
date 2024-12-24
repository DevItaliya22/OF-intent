import {
  Body,
  Controller,
  Post,
  Req,
  Request,
  Transformable,
  Validate,
} from '@intentjs/core';
import { AuthService } from 'app/services/auth';
import {
  LoginDto,
  RegisterDto,
  ResetPasswordDto,
} from 'app/validators/auth';

// 3 all routes checked and working
@Controller('/auth')
export class AuthController extends Transformable {
  constructor(private auth: AuthService) {
    super();
  }
    @Post('/register')
    @Validate(RegisterDto)
    async register(@Body() dto:RegisterDto , @Req() req:Request) {
      const user = await this.auth.register(dto);
      return user;
    }
  
    @Post('/login')
    @Validate(LoginDto)
    async login(@Body() dto: LoginDto,@Req() req:Request) {
      const user = await this.auth.login(dto);
      return user;
    }

    @Post('reset-password')
    @Validate(ResetPasswordDto)
    async resetPassword(
      @Body() dto: ResetPasswordDto,
      @Req() req: Request,
    ): Promise<{ message: string; success: boolean }> {
      const val = await this.auth.resetPassword((req as any).user.email, dto.currentPassword, dto.newPassword);
      return val;
    }
}
