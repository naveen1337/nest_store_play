import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateAdminDto {
  @IsNotEmpty()
  @Length(3,100)
  name: string;

  @IsEmail()
  @Length(3,100)
  email: number;

  @IsNotEmpty()
  @Length(3,100)
  password: string;
}
