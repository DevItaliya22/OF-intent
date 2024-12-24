import { IsString, IsOptional, IsInt, IsUrl, MaxLength, MinLength, IsNotEmpty, IsDate } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  userId: string;  

  @IsString()
  @IsNotEmpty()
  @MinLength(1, { message: 'Post text cannot be empty' })
  @MaxLength(500, { message: 'Post text should not exceed 500 characters' })
  text: string;

  @IsOptional()
  @IsUrl({}, { message: 'Invalid image URL format' })
  imageUrl?: string;

  @IsDate()
  createdAt: Date;
}

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  @MinLength(1, { message: 'Post text cannot be empty' })
  @MaxLength(500, { message: 'Post text should not exceed 500 characters' })
  text?: string;


}