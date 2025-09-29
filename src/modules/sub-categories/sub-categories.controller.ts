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
import { SubCategoriesService } from './sub-categories.service';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { JwtAuthGuard } from '../auth/passport/jwt-auth.guard';
import { ApiResponseData } from 'src/common/bases/api-response';

@ApiTags('Sub-categories')
@Controller('sub-categories')
export class SubCategoriesController {
  constructor(private readonly subCategoriesService: SubCategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all sub-categories' })
  @ApiResponse({
    status: 200,
    description: 'Sub-categories retrieved successfully',
  })
  async findAll(@Query('category') categoryId?: string) {
    let result;
    if (categoryId) {
      result = await this.subCategoriesService.findByCategory(categoryId);
    } else {
      result = await this.subCategoriesService.findAll();
    }
    return ApiResponseData.ok(result, 'Sub-categories retrieved successfully');
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a sub-category by ID' })
  @ApiResponse({
    status: 200,
    description: 'Sub-category retrieved successfully',
  })
  @ApiResponse({ status: 404, description: 'Sub-category not found' })
  async findOne(@Param('id') id: string) {
    const result = await this.subCategoriesService.findOne(id);
    return ApiResponseData.ok(result, 'Sub-category retrieved successfully');
  }
}
