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
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from '../auth/passport/jwt-auth.guard';
import { ApiResponseData } from 'src/common/bases/api-response';

@ApiTags('Admin - Categories')
@Controller('admin/categories')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class AdminCategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new category (Admin)' })
  @ApiResponse({ status: 201, description: 'Category created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const result = await this.categoriesService.create(createCategoryDto);
    return ApiResponseData.ok(result, 'Category created successfully');
  }

  @Get()
  @ApiOperation({ summary: 'Get all categories (Admin)' })
  @ApiResponse({
    status: 200,
    description: 'Categories retrieved successfully',
  })
  async findAll() {
    const result = await this.categoriesService.findAll();
    return ApiResponseData.ok(result, 'Categories retrieved successfully');
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a category by ID (Admin)' })
  @ApiResponse({ status: 200, description: 'Category retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async findOne(@Param('id') id: string) {
    const result = await this.categoriesService.findOne(id);
    return ApiResponseData.ok(result, 'Category retrieved successfully');
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a category (Admin)' })
  @ApiResponse({ status: 200, description: 'Category updated successfully' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const result = await this.categoriesService.update(id, updateCategoryDto);
    return ApiResponseData.ok(result, 'Category updated successfully');
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category (Admin)' })
  @ApiResponse({ status: 200, description: 'Category deleted successfully' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async remove(@Param('id') id: string) {
    await this.categoriesService.remove(id);
    return ApiResponseData.ok(true, 'Category deleted successfully');
  }
}
