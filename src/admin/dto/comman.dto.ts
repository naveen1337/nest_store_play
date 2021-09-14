import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginAdminDto {
  @IsNotEmpty()
  @Length(3, 100)
  email: string;

  @IsNotEmpty()
  @Length(3, 100)
  password: number;
}
