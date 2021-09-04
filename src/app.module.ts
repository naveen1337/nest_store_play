import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { ProductsModule } from './products/products.module';
import db from "./config/db"
import {createAdminTabe} from "./dbModals/schema"

console.log(createAdminTabe())

@Module({
  imports: [AdminModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
