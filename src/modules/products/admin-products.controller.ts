import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindAllProductsDto } from './dto/find-all-products.dto';
import { JwtAuthGuard } from '../auth/passport/jwt-auth.guard';
import { ApiResponseData } from 'src/common/bases/api-response';

@ApiTags('Admin - Products')
@Controller('admin/products')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AdminProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product (Admin)' })
  @ApiResponse({ status: 201, description: 'Product created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Body() createProductDto: CreateProductDto) {
    const result = await this.productsService.create(createProductDto);
    return ApiResponseData.ok(result, 'Product created successfully');
  }

  @Get()
  @ApiOperation({
    summary: 'Get all products with pagination and filters (Admin)',
  })
  @ApiResponse({ status: 200, description: 'Products retrieved successfully' })
  async findAll(@Query() findAllProductsDto: FindAllProductsDto) {
    const result = await this.productsService.findAll(findAllProductsDto);
    return ApiResponseData.ok(result, 'Products retrieved successfully');
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID (Admin)' })
  @ApiResponse({ status: 200, description: 'Product retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async findOne(@Param('id') id: string) {
    const result = await this.productsService.findOne(id);
    return ApiResponseData.ok(result, 'Product retrieved successfully');
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product (Admin)' })
  @ApiResponse({ status: 200, description: 'Product updated successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const result = await this.productsService.update(id, updateProductDto);
    return ApiResponseData.ok(result, 'Product updated successfully');
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product (Admin)' })
  @ApiResponse({ status: 200, description: 'Product deleted successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async remove(@Param('id') id: string) {
    await this.productsService.remove(id);
    return ApiResponseData.ok(true, 'Product deleted successfully');
  }

  @Patch(':id/stock')
  @ApiOperation({ summary: 'Update product stock (Admin)' })
  @ApiResponse({
    status: 200,
    description: 'Product stock updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async updateStock(
    @Param('id') id: string,
    @Body() body: { variant?: string; quantity: number },
  ) {
    const result = await this.productsService.updateStock(
      id,
      body.variant || '',
      body.quantity,
    );
    return ApiResponseData.ok(result, 'Product stock updated successfully');
  }
}
