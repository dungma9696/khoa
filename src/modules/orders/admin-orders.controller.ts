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
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from '../auth/passport/jwt-auth.guard';
import { ApiResponseData } from 'src/common/bases/api-response';

@ApiTags('Admin - Orders')
@Controller('admin/orders')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AdminOrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all orders (Admin)' })
  @ApiResponse({ status: 200, description: 'Orders retrieved successfully' })
  async findAll() {
    const result = await this.ordersService.findAll();
    return ApiResponseData.ok(result, 'Orders retrieved successfully');
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get order statistics (Admin)' })
  @ApiResponse({
    status: 200,
    description: 'Order statistics retrieved successfully',
  })
  async getOrderStats() {
    const result = await this.ordersService.getOrderStats();
    return ApiResponseData.ok(
      result,
      'Order statistics retrieved successfully',
    );
  }

  @Get('revenue')
  @ApiOperation({ summary: 'Get revenue statistics (Admin)' })
  @ApiResponse({
    status: 200,
    description: 'Revenue statistics retrieved successfully',
  })
  async getRevenueStats() {
    const result = await this.ordersService.getRevenueStats();
    return ApiResponseData.ok(
      result,
      'Revenue statistics retrieved successfully',
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an order by ID (Admin)' })
  @ApiResponse({ status: 200, description: 'Order retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async findOne(@Param('id') id: string) {
    const result = await this.ordersService.findOne(id);
    return ApiResponseData.ok(result, 'Order retrieved successfully');
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an order (Admin)' })
  @ApiResponse({ status: 200, description: 'Order updated successfully' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    const result = await this.ordersService.update(id, updateOrderDto);
    return ApiResponseData.ok(result, 'Order updated successfully');
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update order status (Admin)' })
  @ApiResponse({
    status: 200,
    description: 'Order status updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @ApiResponse({ status: 400, description: 'Invalid status' })
  async updateStatus(
    @Param('id') id: string,
    @Body() body: { status: string },
  ) {
    const result = await this.ordersService.updateStatus(id, body.status);
    return ApiResponseData.ok(result, 'Order status updated successfully');
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an order (Admin)' })
  @ApiResponse({ status: 200, description: 'Order deleted successfully' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async remove(@Param('id') id: string) {
    await this.ordersService.remove(id);
    return ApiResponseData.ok(true, 'Order deleted successfully');
  }
}
