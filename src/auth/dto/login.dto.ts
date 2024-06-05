import { IsString, IsStrongPassword } from 'class-validator';

export class LoginDto {
  @IsString()
  username: string;

  @IsString()
  @IsStrongPassword()
  password: string;
}
