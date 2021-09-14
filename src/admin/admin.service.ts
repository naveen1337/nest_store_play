import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import {LoginAdminDto} from "./dto/comman.dto"
import Query from '../dbModals';
import { sanitizeUpdateAdminInput } from '../objCreators/adminObjCreator';
const bcrypt = require('bcrypt');
const util = require('util');
var jwt = require('jsonwebtoken');

@Injectable()
export class AdminService {

  async create(createAdminDto) {
    try {
      const genHash = util.promisify(bcrypt.hash);

      const query = new Query('Admin', 'admin');
      let obj = {
        ...createAdminDto,
      };
      obj.created_at = Date().toString();
      obj.password = await genHash(obj.password,10)
      let dbResponse = await query.insert(obj);
      return dbResponse.status ? dbResponse.message : throwError(dbResponse.message)
    } catch (err) {
      return { message: typeof err === 'string' ? err : 'Failed to Create' };
    }
  }

  async login(LoginAdminDto) {
    try {
      const compareHash = util.promisify(bcrypt.compare);
      const query = new Query('Admin', 'admin');
      const isAdminExists = await query.getBy('email',LoginAdminDto.email)
      isAdminExists.status ? null : throwError(isAdminExists.message)
      const passwordCheck = await compareHash(LoginAdminDto.password,isAdminExists.data[0].password)
      if(passwordCheck){
        // [TO-DO] Implement Refresh Token with Redis
        const token = await jwt.sign({ id: isAdminExists.data[0].id , auth_level:"admin" }, "THIS_KEY_WILL_CHANGE");
        return {token}
      } 
      else{
        throwError("Wrong Password")
      }
    } catch (err) {
      console.log(err)
      return { message: typeof err === 'string' ? err : 'Failed to Login' };
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
      let isUserExists = await query.getBy('admin_id', id);
      (isUserExists.status && isUserExists?.data?.length === 1) ? null : throwError(isUserExists.message)
      
      let updateDbResponse = await query.updateBy("admin_id",id,inputObj) 
      return updateDbResponse.status ? updateDbResponse.message : throwError(updateDbResponse.message)

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
