import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { ProductsModule } from './products/products.module';
import db from "./config/db"


@Module({
  imports: [AdminModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
