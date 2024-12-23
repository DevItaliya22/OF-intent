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

// 3
@Controller('/auth')
export class AuthController extends Transformable {
  constructor(private auth: AuthService) {
    super();
  }
    @Post('/register')
    @Validate(RegisterDto)
    async register(@Body() dto:RegisterDto , @Req() req:Request) {
      const payload2 = await req.all();
      console.log(payload2)
      console.log(dto)
      
      dto.email = payload2.email;
      dto.firstName = payload2.firstName;
      dto.lastName = payload2.lastName;
      dto.password = payload2.password

      const user = await this.auth.register(dto);
      return user;
    }
  
    @Post('/login')
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
    @Validate(ResetPasswordDto)
    async resetPassword(
      @Body() dto: ResetPasswordDto,
      @Req() req: Request,
    ): Promise<{ message: string; success: boolean }> {

      console.log("Reset password controller",(req as any).user)
      const userPayload = (req as any).user; 
      const email = userPayload.email;

      const payload2 = await req.all();
  
      const val = await this.auth.resetPassword(email, payload2.currentPassword, payload2.newPassword);
    
      return val;
    }
}
