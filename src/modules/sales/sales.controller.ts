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

@ApiTags('Sales')
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all active sales' })
  @ApiResponse({ status: 200, description: 'Sales retrieved successfully' })
  findAll() {
    return this.salesService.findActive();
  }

  @Get('product/:productId')
  @ApiOperation({ summary: 'Get sales for a specific product' })
  @ApiResponse({
    status: 200,
    description: 'Product sales retrieved successfully',
  })
  getSalesForProduct(@Param('productId') productId: string) {
    return this.salesService.getSalesForProduct(productId);
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
  getSalesForUser(@GetUser('id') userId: string) {
    return this.salesService.getSalesForUser(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a sale by ID' })
  @ApiResponse({ status: 200, description: 'Sale retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Sale not found' })
  findOne(@Param('id') id: string) {
    return this.salesService.findOne(id);
  }
}
