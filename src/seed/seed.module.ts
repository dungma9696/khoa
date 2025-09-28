import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeedDataService } from './seed-data';
import { SeedController } from './seed.controller';
import { User, UserSchema } from '../modules/users/schemas/user.schema';
import { Role, RoleSchema } from '../modules/roles/schemas/role.schema';
import {
  Permission,
  PermissionSchema,
} from '../modules/permissions/schemas/permission.schema';
import {
  Category,
  CategorySchema,
} from '../modules/categories/schemas/category.schema';
import {
  SubCategory,
  SubCategorySchema,
} from '../modules/sub-categories/schemas/sub-category.schema';
import {
  Product,
  ProductSchema,
} from '../modules/products/schemas/product.schema';
import {
  Discount,
  DiscountSchema,
} from '../modules/discounts/schemas/discount.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
      { name: Permission.name, schema: PermissionSchema },
      { name: Category.name, schema: CategorySchema },
      { name: SubCategory.name, schema: SubCategorySchema },
      { name: Product.name, schema: ProductSchema },
      { name: Discount.name, schema: DiscountSchema },
    ]),
  ],
  controllers: [SeedController],
  providers: [SeedDataService],
  exports: [SeedDataService],
})
export class SeedModule {}
