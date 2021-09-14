import knexBuilder from './schema';
import db from '../config/db';

const log = console.log;

class Query {
  public identification: string;
  public tableName: string;

  constructor(identification: string, tableName: string) {
    this.identification = identification;
    this.tableName = tableName;
  }
  async getAll(): Promise<any> {
    let query = await knexBuilder.select('*').from(this.tableName).toString();
    return new Promise(async (resolve, reject) => {
      db.all(query, (err, rows) => {
        if (err || rows.length === 0) {
          reject({
            status: false,
            message: `NO ${this.identification} Found`,
          });
        } else {
          resolve({
            status: true,
            data: rows,
          });
        }
      });
    });
  }
  async insert(payload: any): Promise<any> {
    let query = await knexBuilder(this.tableName).insert(payload).toString();
    return new Promise(async (resolve, reject) => {
      db.run(query, (err) => {
        if (err) {
          reject({
            status: false,
            message: `Failed to Create ${this.identification}`,
          });
        } else {
          resolve({
            status: true,
            mesage: `${this.identification} Created`,
          });
        }
      });
    });
  }
  async getBy(key: string, value: string): Promise<any> {
    let query = await knexBuilder(this.tableName).where(key, value).toString();
    return new Promise(async (resolve, reject) => {
      db.all(query, (err, rows) => {
        if (err || rows.length === 0) {
          reject({
            status: false,
            message: `Failed to Get ${this.identification}`,
          });
        } else {
          resolve({
            status: true,
            data: rows,
          });
        }
      });
    });
  }
  async updateBy(key: string, value: string, payload: any): Promise<any> {
    let query = await knexBuilder(this.tableName)
      .where(key, value)
      .update(payload)
      .toString();
    return new Promise(async (resolve, reject) => {
      db.run(query, (err) => {
        if (err) {
          reject({
            status: false,
            message: `Failed to Update ${this.identification}`,
          });
        } else {
          resolve({
            status: true,
            message: `SuccessFully ${this.identification} ${value} Updated`,
          });
        }
      });
    });
  }
  async remove(key: string, value: string): Promise<any> {
    let query = await knexBuilder(this.tableName)
      .where(key, value)
      .del()
      .toString();
    return new Promise(async (resolve, reject) => {
      db.run(query, (err) => {
        if (err) {
          reject({
            status: false,
            message: `Failed to Delete ${this.identification}`,
          });
        } else {
          resolve({
            status: true,
            message: `${this.identification} Deleted`,
          });
        }
      });
    });
  }
}

export default Query;
