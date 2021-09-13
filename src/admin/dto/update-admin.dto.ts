import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminDto } from './create-admin.dto';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {
}
