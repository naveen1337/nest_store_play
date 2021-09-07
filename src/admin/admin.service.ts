import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import Query from "../dbModals"

@Injectable()
export class AdminService {
  async create(createAdminDto) {
    const query = new Query("Admin",'admin')
    let obj = {
      ...createAdminDto
    }
    obj.created_at = 11
    console.log(obj)
    let  dbResponse = await query.insert(obj)
    console.log(dbResponse) 
    return dbResponse
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
