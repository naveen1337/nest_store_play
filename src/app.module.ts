import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { ProductsModule } from './products/products.module';
import db from "./config/db"
import {createAdminTabe} from "./dbModals/schema"
import query from "./dbModals"


db.on('open', async () => {
  console.log('Db Connection Opened');
});

(async ()=>{
  // const createAdmin = await createAdminTabe()
  // console.log(createAdmin)
})()


@Module({
  imports: [AdminModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
