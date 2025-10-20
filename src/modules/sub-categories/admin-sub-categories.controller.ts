import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { SubCategoriesService } from './sub-categories.service';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { JwtAuthGuard } from '../auth/passport/jwt-auth.guard';
import { ApiResponseData } from 'src/common/bases/api-response';

@ApiTags('Admin - Sub-categories')
@Controller('admin/sub-categories')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class AdminSubCategoriesController {
  constructor(private readonly subCategoriesService: SubCategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new sub-category (Admin)' })
  @ApiResponse({
    status: 201,
    description: 'Sub-category created successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Body() createSubCategoryDto: CreateSubCategoryDto) {
    const result = await this.subCategoriesService.create(createSubCategoryDto);
    return ApiResponseData.ok(result, 'Sub-category created successfully');
  }

  @Get()
  @ApiOperation({ summary: 'Get all sub-categories (Admin)' })
  @ApiResponse({
    status: 200,
    description: 'Sub-categories retrieved successfully',
  })
  async findAll() {
    const result = await this.subCategoriesService.findAll();
    return ApiResponseData.ok(result, 'Sub-categories retrieved successfully');
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a sub-category by ID (Admin)' })
  @ApiResponse({
    status: 200,
    description: 'Sub-category retrieved successfully',
  })
  @ApiResponse({ status: 404, description: 'Sub-category not found' })
  async findOne(@Param('id') id: string) {
    const result = await this.subCategoriesService.findOne(id);
    return ApiResponseData.ok(result, 'Sub-category retrieved successfully');
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a sub-category (Admin)' })
  @ApiResponse({
    status: 200,
    description: 'Sub-category updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Sub-category not found' })
  async update(
    @Param('id') id: string,
    @Body() updateSubCategoryDto: UpdateSubCategoryDto,
  ) {
    const result = await this.subCategoriesService.update(
      id,
      updateSubCategoryDto,
    );
    return ApiResponseData.ok(result, 'Sub-category updated successfully');
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a sub-category (Admin)' })
  @ApiResponse({
    status: 200,
    description: 'Sub-category deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Sub-category not found' })
  async remove(@Param('id') id: string) {
    await this.subCategoriesService.remove(id);
    return ApiResponseData.ok(true, 'Sub-category deleted successfully');
  }
}
