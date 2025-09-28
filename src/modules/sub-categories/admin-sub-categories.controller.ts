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

@ApiTags('Admin - Sub-categories')
@Controller('admin/sub-categories')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AdminSubCategoriesController {
  constructor(private readonly subCategoriesService: SubCategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new sub-category (Admin)' })
  @ApiResponse({
    status: 201,
    description: 'Sub-category created successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() createSubCategoryDto: CreateSubCategoryDto) {
    return this.subCategoriesService.create(createSubCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all sub-categories (Admin)' })
  @ApiResponse({
    status: 200,
    description: 'Sub-categories retrieved successfully',
  })
  findAll() {
    return this.subCategoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a sub-category by ID (Admin)' })
  @ApiResponse({
    status: 200,
    description: 'Sub-category retrieved successfully',
  })
  @ApiResponse({ status: 404, description: 'Sub-category not found' })
  findOne(@Param('id') id: string) {
    return this.subCategoriesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a sub-category (Admin)' })
  @ApiResponse({
    status: 200,
    description: 'Sub-category updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Sub-category not found' })
  update(
    @Param('id') id: string,
    @Body() updateSubCategoryDto: UpdateSubCategoryDto,
  ) {
    return this.subCategoriesService.update(id, updateSubCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a sub-category (Admin)' })
  @ApiResponse({
    status: 200,
    description: 'Sub-category deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Sub-category not found' })
  remove(@Param('id') id: string) {
    return this.subCategoriesService.remove(id);
  }
}
