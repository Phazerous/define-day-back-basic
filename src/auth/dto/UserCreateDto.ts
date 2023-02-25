import { IsEmail, IsString, MinLength } from 'class-validator';

export default class UserCreateDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}
