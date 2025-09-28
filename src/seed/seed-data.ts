import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../modules/users/schemas/user.schema';
import { Role, RoleDocument } from '../modules/roles/schemas/role.schema';
import {
  Permission,
  PermissionDocument,
} from '../modules/permissions/schemas/permission.schema';
import {
  Category,
  CategoryDocument,
} from '../modules/categories/schemas/category.schema';
import {
  SubCategory,
  SubCategoryDocument,
} from '../modules/sub-categories/schemas/sub-category.schema';
import {
  Product,
  ProductDocument,
} from '../modules/products/schemas/product.schema';
import {
  Discount,
  DiscountDocument,
} from '../modules/discounts/schemas/discount.schema';

@Injectable()
export class SeedDataService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
    @InjectModel(Permission.name)
    private permissionModel: Model<PermissionDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    @InjectModel(SubCategory.name)
    private subCategoryModel: Model<SubCategoryDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(Discount.name) private discountModel: Model<DiscountDocument>,
  ) {}

  async seedAll() {
    console.log('🌱 Starting database seeding...');

    await this.seedPermissions();
    await this.seedRoles();
    await this.seedUsers();
    await this.seedCategories();
    await this.seedSubCategories();
    await this.seedProducts();
    await this.seedDiscounts();

    console.log('✅ Database seeding completed!');
  }

  async seedPermissions() {
    console.log('📝 Seeding permissions...');

    const permissions = [
      { name: 'create_product', description: 'Create new products' },
      { name: 'update_product', description: 'Update products' },
      { name: 'delete_product', description: 'Delete products' },
      { name: 'view_products', description: 'View all products' },
      { name: 'create_category', description: 'Create new categories' },
      { name: 'update_category', description: 'Update categories' },
      { name: 'delete_category', description: 'Delete categories' },
      { name: 'view_categories', description: 'View all categories' },
      { name: 'create_user', description: 'Create new users' },
      { name: 'update_user', description: 'Update users' },
      { name: 'delete_user', description: 'Delete users' },
      { name: 'view_users', description: 'View all users' },
      { name: 'view_orders', description: 'View all orders' },
      { name: 'update_orders', description: 'Update orders' },
      { name: 'view_reviews', description: 'View all reviews' },
      { name: 'approve_reviews', description: 'Approve reviews' },
      { name: 'create_sales', description: 'Create sales campaigns' },
      { name: 'update_sales', description: 'Update sales campaigns' },
      { name: 'delete_sales', description: 'Delete sales campaigns' },
      { name: 'view_sales', description: 'View all sales' },
      { name: 'create_discounts', description: 'Create discount codes' },
      { name: 'update_discounts', description: 'Update discount codes' },
      { name: 'delete_discounts', description: 'Delete discount codes' },
      { name: 'view_discounts', description: 'View all discounts' },
    ];

    for (const permission of permissions) {
      await this.permissionModel.findOneAndUpdate(
        { name: permission.name },
        permission,
        { upsert: true, new: true },
      );
    }
  }

  async seedRoles() {
    console.log('👥 Seeding roles...');

    const adminPermissions = await this.permissionModel.find({}).select('_id');
    const customerPermissions = await this.permissionModel
      .find({
        name: { $in: ['view_products', 'view_categories'] },
      })
      .select('_id');

    const roles = [
      {
        name: 'Admin',
        permissions: adminPermissions.map((p) => p._id),
        status: 'active',
      },
      {
        name: 'Customer',
        permissions: customerPermissions.map((p) => p._id),
        status: 'active',
      },
    ];

    for (const role of roles) {
      await this.roleModel.findOneAndUpdate({ name: role.name }, role, {
        upsert: true,
        new: true,
      });
    }
  }

  async seedUsers() {
    console.log('👤 Seeding users...');

    const adminRole = await this.roleModel.findOne({ name: 'Admin' });
    const customerRole = await this.roleModel.findOne({ name: 'Customer' });

    if (!adminRole || !customerRole) {
      throw new Error(
        'Required roles not found. Please run seed permissions and roles first.',
      );
    }

    const hashedPassword = await bcrypt.hash('123456', 10);

    const users = [
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
        phone: '0123456789',
        roles: adminRole._id,
        status: 'active',
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: hashedPassword,
        phone: '0987654321',
        roles: customerRole._id,
        status: 'active',
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: hashedPassword,
        phone: '0555666777',
        roles: customerRole._id,
        status: 'active',
      },
    ];

    for (const user of users) {
      await this.userModel.findOneAndUpdate({ email: user.email }, user, {
        upsert: true,
        new: true,
      });
    }
  }

  async seedCategories() {
    console.log('📂 Seeding categories...');

    const categories = [
      { name: 'Electronics', description: 'Electronic devices and gadgets' },
      { name: 'Clothing', description: 'Fashion and apparel' },
      {
        name: 'Home & Garden',
        description: 'Home improvement and garden supplies',
      },
      { name: 'Sports', description: 'Sports equipment and accessories' },
      { name: 'Books', description: 'Books and educational materials' },
    ];

    for (const category of categories) {
      await this.categoryModel.findOneAndUpdate(
        { name: category.name },
        category,
        { upsert: true, new: true },
      );
    }
  }

  async seedSubCategories() {
    console.log('📁 Seeding sub-categories...');

    const electronics = await this.categoryModel.findOne({
      name: 'Electronics',
    });
    const clothing = await this.categoryModel.findOne({ name: 'Clothing' });
    const home = await this.categoryModel.findOne({ name: 'Home & Garden' });
    const sports = await this.categoryModel.findOne({ name: 'Sports' });
    const books = await this.categoryModel.findOne({ name: 'Books' });

    if (!electronics || !clothing || !home || !sports || !books) {
      throw new Error(
        'Required categories not found. Please run seed categories first.',
      );
    }

    const subCategories = [
      { name: 'Smartphones', category: electronics._id, gender: 'Unisex' },
      { name: 'Laptops', category: electronics._id, gender: 'Unisex' },
      { name: 'Headphones', category: electronics._id, gender: 'Unisex' },
      { name: "Men's T-Shirts", category: clothing._id, gender: 'Male' },
      { name: "Women's Dresses", category: clothing._id, gender: 'Female' },
      { name: 'Shoes', category: clothing._id, gender: 'Unisex' },
      { name: 'Furniture', category: home._id, gender: 'Unisex' },
      { name: 'Kitchen Tools', category: home._id, gender: 'Unisex' },
      { name: 'Fitness Equipment', category: sports._id, gender: 'Unisex' },
      { name: 'Outdoor Gear', category: sports._id, gender: 'Unisex' },
      { name: 'Fiction', category: books._id, gender: 'Unisex' },
      { name: 'Non-Fiction', category: books._id, gender: 'Unisex' },
    ];

    for (const subCategory of subCategories) {
      await this.subCategoryModel.findOneAndUpdate(
        { name: subCategory.name },
        subCategory,
        { upsert: true, new: true },
      );
    }
  }

  async seedProducts() {
    console.log('📦 Seeding products...');

    const electronics = await this.categoryModel.findOne({
      name: 'Electronics',
    });
    const clothing = await this.categoryModel.findOne({ name: 'Clothing' });
    const home = await this.categoryModel.findOne({ name: 'Home & Garden' });

    if (!electronics || !clothing || !home) {
      throw new Error(
        'Required categories not found. Please run seed categories first.',
      );
    }

    const products = [
      {
        name: 'iPhone 15 Pro',
        category: electronics._id,
        price: 999,
        description: 'Latest iPhone with advanced features',
        material: 'Titanium',
        technology: 'A17 Pro Chip',
        thumbnail: 'https://example.com/iphone15pro.jpg',
        images: [
          'https://example.com/iphone15pro1.jpg',
          'https://example.com/iphone15pro2.jpg',
        ],
        variants: [
          { name: 'Storage', value: '128GB', priceAdjustment: 0 },
          { name: 'Storage', value: '256GB', priceAdjustment: 100 },
          { name: 'Storage', value: '512GB', priceAdjustment: 300 },
        ],
        status: 'available',
      },
      {
        name: 'MacBook Pro M3',
        category: electronics._id,
        price: 1999,
        description: 'Powerful laptop for professionals',
        material: 'Aluminum',
        technology: 'M3 Chip',
        thumbnail: 'https://example.com/macbookpro.jpg',
        images: ['https://example.com/macbookpro1.jpg'],
        variants: [
          { name: 'Screen Size', value: '14-inch', priceAdjustment: 0 },
          { name: 'Screen Size', value: '16-inch', priceAdjustment: 400 },
        ],
        status: 'available',
      },
      {
        name: 'Cotton T-Shirt',
        category: clothing._id,
        price: 29,
        description: 'Comfortable cotton t-shirt',
        material: '100% Cotton',
        thumbnail: 'https://example.com/tshirt.jpg',
        images: ['https://example.com/tshirt1.jpg'],
        variants: [
          { name: 'Size', value: 'S', priceAdjustment: 0 },
          { name: 'Size', value: 'M', priceAdjustment: 0 },
          { name: 'Size', value: 'L', priceAdjustment: 0 },
          { name: 'Size', value: 'XL', priceAdjustment: 5 },
        ],
        status: 'available',
      },
      {
        name: 'Modern Sofa',
        category: home._id,
        price: 899,
        description: 'Comfortable modern sofa for living room',
        material: 'Fabric',
        thumbnail: 'https://example.com/sofa.jpg',
        images: ['https://example.com/sofa1.jpg'],
        variants: [
          { name: 'Color', value: 'Gray', priceAdjustment: 0 },
          { name: 'Color', value: 'Blue', priceAdjustment: 50 },
          { name: 'Color', value: 'Black', priceAdjustment: 0 },
        ],
        status: 'available',
      },
    ];

    for (const product of products) {
      await this.productModel.findOneAndUpdate(
        { name: product.name },
        product,
        { upsert: true, new: true },
      );
    }
  }

  async seedDiscounts() {
    console.log('🎫 Seeding discounts...');

    const discounts = [
      {
        name: 'Welcome Discount',
        description: '10% off for new customers',
        code: 'WELCOME10',
        value: '10%',
        type: 'percentage',
        percentage: 10,
        minOrderValue: 50,
        maxDiscountAmount: 100,
        usageLimit: 1000,
        startDate: new Date(),
        endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
        status: 'active',
      },
      {
        name: 'Summer Sale',
        description: '$20 off orders over $100',
        code: 'SUMMER20',
        value: '$20',
        type: 'fixed_amount',
        amount: 20,
        minOrderValue: 100,
        usageLimit: 500,
        startDate: new Date(),
        endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 3 months
        status: 'active',
      },
      {
        name: 'Flash Sale',
        description: '25% off everything',
        code: 'FLASH25',
        value: '25%',
        type: 'percentage',
        percentage: 25,
        maxDiscountAmount: 200,
        usageLimit: 100,
        startDate: new Date(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week
        status: 'active',
      },
    ];

    for (const discount of discounts) {
      await this.discountModel.findOneAndUpdate(
        { code: discount.code },
        discount,
        { upsert: true, new: true },
      );
    }
  }
}
