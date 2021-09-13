import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import Query from '../dbModals';
import { sanitizeUpdateAdminInput } from '../objCreators/adminObjCreator';

@Injectable()
export class AdminService {
  async create(createAdminDto) {
    try {
      const query = new Query('Admin', 'admin');
      let obj = {
        ...createAdminDto,
      };
      obj.created_at = Date().toString();
      let dbResponse = await query.insert(obj);
      return dbResponse.status ? dbResponse.message : throwError(dbResponse.message)
    } catch (err) {
      return { message: typeof err === 'string' ? err : 'Failed to Create' };
    }
  }

  async getAll() {
    try {
      const query = new Query('Admin', 'admin');
      let dbResponse = await query.getAll();
      return dbResponse.status ? dbResponse.data : throwError(dbResponse.message)
    
    } catch (err) {
      return { message: typeof err?.message === 'string' ? err.message : 'Failed to GET' };
    }
  }

  async findOne(id: string) {
    try {
      const query = new Query('Admin', 'admin');
      let dbResponse = await query.getBy('admin_id', id);
      return (dbResponse.status && dbResponse.data.length === 1) ? dbResponse.data[0] : throwError(dbResponse.message)
    } catch (err) {
      console.log(err)
      return { message: typeof err?.message === 'string' ? err.message : 'Failed to GET' };
    }
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    try {
      let inputObj = await sanitizeUpdateAdminInput(updateAdminDto);
      const query = new Query('Admin', 'admin');
      let dbResponse = await query.getBy('admin_id', id);
      console.log(dbResponse)
      if(dbResponse.status && dbResponse?.data?.length === 1){

      }
      else{
        return throwError(dbResponse.message)
      }
    } catch (err) {
      console.log(err)
      return { message: typeof err?.message === 'string' ? err.message : 'Failed to Update' };
    }
  }

  async remove(id: string) {
    try {
      const query = new Query('Admin', 'admin');
      let dbResponse = await query.remove('admin_id', id);
      return dbResponse;
    } catch (err) {
      return { message: typeof err?.message === 'string' ? err.message : 'Failed to Delete' };
    }
  }
}

function throwError(err:any){
  throw err
}
