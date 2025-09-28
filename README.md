# E-commerce API - NestJS Base

## 🚀 Tổng quan

Đây là một API e-commerce hoàn chỉnh được xây dựng với NestJS và MongoDB, cung cấp đầy đủ các chức năng cho cả website client và admin.

## ✨ Tính năng chính

### 🛍️ E-commerce Features

- **Quản lý sản phẩm**: Categories, Sub-categories, Products với variants
- **Giỏ hàng**: Thêm, sửa, xóa sản phẩm trong giỏ hàng
- **Đơn hàng**: Tạo, quản lý, theo dõi đơn hàng
- **Đánh giá**: Hệ thống review và rating sản phẩm
- **Khuyến mãi**: Sales campaigns và discount codes
- **Banner**: Quản lý banner quảng cáo

### 👥 User Management

- **Authentication**: JWT-based authentication
- **Authorization**: Role-based permissions system
- **User Profiles**: Quản lý thông tin người dùng
- **Email**: Gửi email xác thực và thông báo

### 🔧 Technical Features

- **RESTful API**: Thiết kế API chuẩn REST
- **Swagger Documentation**: API documentation tự động
- **Validation**: Input validation với class-validator
- **Error Handling**: Xử lý lỗi toàn cục
- **Caching**: Redis caching cho performance
- **File Upload**: Upload và quản lý file
- **Pagination**: Hỗ trợ phân trang
- **Search & Filter**: Tìm kiếm và lọc dữ liệu

## 🏗️ Kiến trúc

### Database Schema

```
Users ←→ Roles ←→ Permissions
  ↓
Orders ←→ Products ←→ Categories
  ↓        ↓
Carts    Reviews
  ↓
Sales ←→ Discounts
```

### Module Structure

```
src/
├── modules/
│   ├── auth/           # Authentication & Authorization
│   ├── users/          # User management
│   ├── categories/     # Product categories
│   ├── sub-categories/ # Sub-categories
│   ├── products/       # Product management
│   ├── roles/          # User roles
│   ├── permissions/    # User permissions
│   ├── reviews/        # Product reviews
│   ├── orders/         # Order management
│   ├── carts/          # Shopping cart
│   ├── sales/          # Sales campaigns
│   ├── discounts/      # Discount codes
│   ├── files/          # File upload
│   └── banners/        # Banner management
├── common/             # Shared utilities
├── config/             # Configuration
├── seed/               # Database seeding
└── main.ts             # Application entry point
```

## 🚀 Cài đặt và chạy

### Yêu cầu hệ thống

- Node.js >= 18
- MongoDB >= 4.4
- Redis (optional, for caching)

### 1. Clone repository

```bash
git clone <repository-url>
cd nestjs-base
```

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Cấu hình environment variables

Tạo file `.env` trong thư mục root:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/ecommerce

# JWT
JWT_SECRET=your-super-secret-jwt-key

# Email (Gmail)
MAIL_USER=your-email@gmail.com
MAIL_PASSWORD=your-app-password

# Redis (optional)
REDIS_URL=redis://localhost:6379
```

### 4. Chạy ứng dụng

#### Development

```bash
npm run start:dev
```

#### Production

```bash
npm run build
npm run start:prod
```

### 5. Khởi tạo dữ liệu mẫu

```bash
# Gọi API để seed database
POST http://localhost:3000/seed
```

## 📚 API Documentation

### Swagger UI

Truy cập Swagger UI tại: `http://localhost:3000/api`

### API Endpoints

#### Authentication

- `POST /auth/login` - Đăng nhập
- `POST /auth/register` - Đăng ký
- `POST /auth/forgot-password` - Quên mật khẩu
- `POST /auth/change-password` - Đổi mật khẩu

#### Client APIs

- `GET /categories` - Danh sách danh mục
- `GET /products` - Danh sách sản phẩm
- `GET /products/:id` - Chi tiết sản phẩm
- `POST /reviews` - Tạo đánh giá
- `GET /reviews/product/:id` - Đánh giá sản phẩm
- `POST /orders` - Tạo đơn hàng
- `GET /orders/my-orders` - Đơn hàng của tôi
- `GET /carts` - Giỏ hàng
- `POST /carts/add` - Thêm vào giỏ hàng
- `GET /sales` - Chương trình khuyến mãi
- `GET /discounts` - Mã giảm giá

#### Admin APIs

- `POST /admin/categories` - Tạo danh mục
- `POST /admin/products` - Tạo sản phẩm
- `GET /admin/orders` - Tất cả đơn hàng
- `GET /admin/orders/stats` - Thống kê đơn hàng
- `GET /admin/users` - Quản lý người dùng
- `POST /admin/sales` - Tạo chương trình khuyến mãi
- `POST /admin/discounts` - Tạo mã giảm giá

## 🔐 Authentication

### JWT Token

Tất cả API admin và một số API client yêu cầu JWT token:

```bash
Authorization: Bearer <your-jwt-token>
```

### Default Users (sau khi seed)

- **Admin**: `admin@example.com` / `123456`
- **Customer**: `john@example.com` / `123456`

## 🗄️ Database

### Collections

- `users` - Người dùng
- `roles` - Vai trò
- `permissions` - Quyền hạn
- `categories` - Danh mục
- `subcategories` - Danh mục con
- `products` - Sản phẩm
- `reviews` - Đánh giá
- `orders` - Đơn hàng
- `carts` - Giỏ hàng
- `sales` - Chương trình khuyến mãi
- `discounts` - Mã giảm giá
- `banners` - Banner

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📦 Scripts

```bash
npm run start          # Start production
npm run start:dev      # Start development
npm run start:debug    # Start with debug
npm run build          # Build for production
npm run format         # Format code
npm run lint           # Lint code
```

## 🔧 Development

### Code Structure

- **Controllers**: Xử lý HTTP requests
- **Services**: Business logic
- **DTOs**: Data transfer objects
- **Schemas**: MongoDB schemas
- **Guards**: Authentication guards
- **Decorators**: Custom decorators

### Best Practices

- Sử dụng TypeScript strict mode
- Validation với class-validator
- Error handling toàn cục
- Logging với built-in logger
- Environment-based configuration

## 🚀 Deployment

### Docker

```bash
# Build image
docker build -t ecommerce-api .

# Run container
docker run -p 3000:3000 ecommerce-api
```

### Environment Variables

Đảm bảo cấu hình đúng các biến môi trường cho production:

- `MONGODB_URI`
- `JWT_SECRET`
- `MAIL_USER`
- `MAIL_PASSWORD`

## 📝 License

MIT License

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📞 Support

Nếu có vấn đề hoặc câu hỏi, vui lòng tạo issue trên GitHub.

---

**Happy Coding! 🎉**
