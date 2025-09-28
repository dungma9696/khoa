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
  create(@Body() createDiscountDto: CreateDiscountDto) {
    return this.discountsService.create(createDiscountDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all discounts (Admin)' })
  @ApiResponse({ status: 200, description: 'Discounts retrieved successfully' })
  findAll() {
    return this.discountsService.findAll();
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get discount statistics (Admin)' })
  @ApiResponse({
    status: 200,
    description: 'Discount statistics retrieved successfully',
  })
  getDiscountStats() {
    return this.discountsService.getDiscountStats();
  }

  @Get('update-status')
  @ApiOperation({ summary: 'Update discount status (Admin)' })
  @ApiResponse({
    status: 200,
    description: 'Discount status updated successfully',
  })
  updateDiscountStatus() {
    return this.discountsService.updateDiscountStatus();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a discount by ID (Admin)' })
  @ApiResponse({ status: 200, description: 'Discount retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Discount not found' })
  findOne(@Param('id') id: string) {
    return this.discountsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a discount (Admin)' })
  @ApiResponse({ status: 200, description: 'Discount updated successfully' })
  @ApiResponse({ status: 404, description: 'Discount not found' })
  update(
    @Param('id') id: string,
    @Body() updateDiscountDto: UpdateDiscountDto,
  ) {
    return this.discountsService.update(id, updateDiscountDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a discount (Admin)' })
  @ApiResponse({ status: 200, description: 'Discount deleted successfully' })
  @ApiResponse({ status: 404, description: 'Discount not found' })
  remove(@Param('id') id: string) {
    return this.discountsService.remove(id);
  }
}
