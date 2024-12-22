import { IsEmail, IsNotEmpty, IsString, MAX_LENGTH, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(25)
  password: string;
}

export class RegisterDto extends LoginDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  lastName: string;
}

export class ChangePasswordUsingTokenDto {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(25)
  password: string;
}
