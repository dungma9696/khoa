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
  findAll(@Query('category') categoryId?: string) {
    if (categoryId) {
      return this.subCategoriesService.findByCategory(categoryId);
    }
    return this.subCategoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a sub-category by ID' })
  @ApiResponse({
    status: 200,
    description: 'Sub-category retrieved successfully',
  })
  @ApiResponse({ status: 404, description: 'Sub-category not found' })
  findOne(@Param('id') id: string) {
    return this.subCategoriesService.findOne(id);
  }
}
