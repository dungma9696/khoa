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
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { JwtAuthGuard } from '../auth/passport/jwt-auth.guard';
import { ApiResponseData } from 'src/common/bases/api-response';

@ApiTags('Admin - Sales')
@Controller('admin/sales')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AdminSalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new sale (Admin)' })
  @ApiResponse({ status: 201, description: 'Sale created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Body() createSaleDto: CreateSaleDto) {
    const result = await this.salesService.create(createSaleDto);
    return ApiResponseData.ok(result, 'Sale created successfully');
  }

  @Get()
  @ApiOperation({ summary: 'Get all sales (Admin)' })
  @ApiResponse({ status: 200, description: 'Sales retrieved successfully' })
  async findAll() {
    const result = await this.salesService.findAll();
    return ApiResponseData.ok(result, 'Sales retrieved successfully');
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get sales statistics (Admin)' })
  @ApiResponse({
    status: 200,
    description: 'Sales statistics retrieved successfully',
  })
  async getSaleStats() {
    const result = await this.salesService.getSaleStats();
    return ApiResponseData.ok(
      result,
      'Sales statistics retrieved successfully',
    );
  }

  @Get('update-status')
  @ApiOperation({ summary: 'Update sales status (Admin)' })
  @ApiResponse({
    status: 200,
    description: 'Sales status updated successfully',
  })
  async updateSaleStatus() {
    const result = await this.salesService.updateSaleStatus();
    return ApiResponseData.ok(result, 'Sales status updated successfully');
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a sale by ID (Admin)' })
  @ApiResponse({ status: 200, description: 'Sale retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Sale not found' })
  async findOne(@Param('id') id: string) {
    const result = await this.salesService.findOne(id);
    return ApiResponseData.ok(result, 'Sale retrieved successfully');
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a sale (Admin)' })
  @ApiResponse({ status: 200, description: 'Sale updated successfully' })
  @ApiResponse({ status: 404, description: 'Sale not found' })
  async update(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto) {
    const result = await this.salesService.update(id, updateSaleDto);
    return ApiResponseData.ok(result, 'Sale updated successfully');
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a sale (Admin)' })
  @ApiResponse({ status: 200, description: 'Sale deleted successfully' })
  @ApiResponse({ status: 404, description: 'Sale not found' })
  async remove(@Param('id') id: string) {
    await this.salesService.remove(id);
    return ApiResponseData.ok(true, 'Sale deleted successfully');
  }
}
