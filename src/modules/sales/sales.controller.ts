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
import { GetUser } from '../auth/decorators/get-user.decorator';
import { ApiResponseData } from 'src/common/bases/api-response';

@ApiTags('Sales')
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all active sales' })
  @ApiResponse({ status: 200, description: 'Sales retrieved successfully' })
  async findAll() {
    const result = await this.salesService.findActive();
    return ApiResponseData.ok(result, 'Sales retrieved successfully');
  }

  @Get('product/:productId')
  @ApiOperation({ summary: 'Get sales for a specific product' })
  @ApiResponse({
    status: 200,
    description: 'Product sales retrieved successfully',
  })
  async getSalesForProduct(@Param('productId') productId: string) {
    const result = await this.salesService.getSalesForProduct(productId);
    return ApiResponseData.ok(result, 'Product sales retrieved successfully');
  }

  @Get('my-sales')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get sales available for current user' })
  @ApiResponse({
    status: 200,
    description: 'User sales retrieved successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getSalesForUser(@GetUser('id') userId: string) {
    const result = await this.salesService.getSalesForUser(userId);
    return ApiResponseData.ok(result, 'User sales retrieved successfully');
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a sale by ID' })
  @ApiResponse({ status: 200, description: 'Sale retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Sale not found' })
  async findOne(@Param('id') id: string) {
    const result = await this.salesService.findOne(id);
    return ApiResponseData.ok(result, 'Sale retrieved successfully');
  }
}
