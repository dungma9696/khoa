import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { AdminSalesController } from './admin-sales.controller';
import { Sale, SaleSchema } from './schemas/sale.schema';
import { ProductsModule } from '../products/products.module';
import { DiscountsModule } from '../discounts/discounts.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sale.name, schema: SaleSchema }]),
    ProductsModule,
    DiscountsModule,
  ],
  controllers: [SalesController, AdminSalesController],
  providers: [SalesService],
  exports: [SalesService],
})
export class SalesModule {}
