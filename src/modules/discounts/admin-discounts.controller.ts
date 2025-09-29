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
import { DiscountsService } from './discounts.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { JwtAuthGuard } from '../auth/passport/jwt-auth.guard';
import { ApiResponseData } from 'src/common/bases/api-response';

@ApiTags('Admin - Discounts')
@Controller('admin/discounts')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AdminDiscountsController {
  constructor(private readonly discountsService: DiscountsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new discount (Admin)' })
  @ApiResponse({ status: 201, description: 'Discount created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Body() createDiscountDto: CreateDiscountDto) {
    const result = await this.discountsService.create(createDiscountDto);
    return ApiResponseData.ok(result, 'Discount created successfully');
  }

  @Get()
  @ApiOperation({ summary: 'Get all discounts (Admin)' })
  @ApiResponse({ status: 200, description: 'Discounts retrieved successfully' })
  async findAll() {
    const result = await this.discountsService.findAll();
    return ApiResponseData.ok(result, 'Discounts retrieved successfully');
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get discount statistics (Admin)' })
  @ApiResponse({
    status: 200,
    description: 'Discount statistics retrieved successfully',
  })
  async getDiscountStats() {
    const result = await this.discountsService.getDiscountStats();
    return ApiResponseData.ok(
      result,
      'Discount statistics retrieved successfully',
    );
  }

  @Get('update-status')
  @ApiOperation({ summary: 'Update discount status (Admin)' })
  @ApiResponse({
    status: 200,
    description: 'Discount status updated successfully',
  })
  async updateDiscountStatus() {
    const result = await this.discountsService.updateDiscountStatus();
    return ApiResponseData.ok(result, 'Discount status updated successfully');
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a discount by ID (Admin)' })
  @ApiResponse({ status: 200, description: 'Discount retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Discount not found' })
  async findOne(@Param('id') id: string) {
    const result = await this.discountsService.findOne(id);
    return ApiResponseData.ok(result, 'Discount retrieved successfully');
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a discount (Admin)' })
  @ApiResponse({ status: 200, description: 'Discount updated successfully' })
  @ApiResponse({ status: 404, description: 'Discount not found' })
  async update(
    @Param('id') id: string,
    @Body() updateDiscountDto: UpdateDiscountDto,
  ) {
    const result = await this.discountsService.update(id, updateDiscountDto);
    return ApiResponseData.ok(result, 'Discount updated successfully');
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a discount (Admin)' })
  @ApiResponse({ status: 200, description: 'Discount deleted successfully' })
  @ApiResponse({ status: 404, description: 'Discount not found' })
  async remove(@Param('id') id: string) {
    await this.discountsService.remove(id);
    return ApiResponseData.ok(true, 'Discount deleted successfully');
  }
}
