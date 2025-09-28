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
  create(@Body() createSaleDto: CreateSaleDto) {
    return this.salesService.create(createSaleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all sales (Admin)' })
  @ApiResponse({ status: 200, description: 'Sales retrieved successfully' })
  findAll() {
    return this.salesService.findAll();
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get sales statistics (Admin)' })
  @ApiResponse({
    status: 200,
    description: 'Sales statistics retrieved successfully',
  })
  getSaleStats() {
    return this.salesService.getSaleStats();
  }

  @Get('update-status')
  @ApiOperation({ summary: 'Update sales status (Admin)' })
  @ApiResponse({
    status: 200,
    description: 'Sales status updated successfully',
  })
  updateSaleStatus() {
    return this.salesService.updateSaleStatus();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a sale by ID (Admin)' })
  @ApiResponse({ status: 200, description: 'Sale retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Sale not found' })
  findOne(@Param('id') id: string) {
    return this.salesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a sale (Admin)' })
  @ApiResponse({ status: 200, description: 'Sale updated successfully' })
  @ApiResponse({ status: 404, description: 'Sale not found' })
  update(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto) {
    return this.salesService.update(id, updateSaleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a sale (Admin)' })
  @ApiResponse({ status: 200, description: 'Sale deleted successfully' })
  @ApiResponse({ status: 404, description: 'Sale not found' })
  remove(@Param('id') id: string) {
    return this.salesService.remove(id);
  }
}
