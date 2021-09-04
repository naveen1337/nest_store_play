import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { ProductsModule } from './products/products.module';
import db from "./config/db"
import {createAdminTabe} from "./dbModals/schema"
import query from "./dbModals"

// let dbQuery = new query('Admin','admin')
// console.log(dbQuery.insert({name:"1"}))

// console.log(createAdminTabe())

@Module({
  imports: [AdminModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
