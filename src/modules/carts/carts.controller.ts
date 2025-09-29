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
import { CartsService } from './carts.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { JwtAuthGuard } from '../auth/passport/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { ApiResponseData } from 'src/common/bases/api-response';

@ApiTags('Carts')
@Controller('carts')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get()
  @ApiOperation({ summary: 'Get current user cart' })
  @ApiResponse({ status: 200, description: 'Cart retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getCart(@GetUser('id') userId: string) {
    const result = await this.cartsService.getCart(userId);
    return ApiResponseData.ok(result, 'Cart retrieved successfully');
  }

  @Get('total')
  @ApiOperation({ summary: 'Get cart total' })
  @ApiResponse({
    status: 200,
    description: 'Cart total retrieved successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getCartTotal(@GetUser('id') userId: string) {
    const result = await this.cartsService.getCartTotal(userId);
    return ApiResponseData.ok(result, 'Cart total retrieved successfully');
  }

  @Post('add')
  @ApiOperation({ summary: 'Add item to cart' })
  @ApiResponse({ status: 201, description: 'Item added to cart successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async addToCart(
    @Body() addToCartDto: AddToCartDto,
    @GetUser('id') userId: string,
  ) {
    const result = await this.cartsService.addToCart(addToCartDto, userId);
    return ApiResponseData.ok(result, 'Item added to cart successfully');
  }

  @Patch('update')
  @ApiOperation({ summary: 'Update cart item quantity' })
  @ApiResponse({ status: 200, description: 'Cart item updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Cart item not found' })
  async updateCartItem(
    @Body() updateCartItemDto: UpdateCartItemDto,
    @GetUser('id') userId: string,
  ) {
    const result = await this.cartsService.updateCartItem(
      updateCartItemDto,
      userId,
    );
    return ApiResponseData.ok(result, 'Cart item updated successfully');
  }

  @Delete('remove/:productId')
  @ApiOperation({ summary: 'Remove item from cart' })
  @ApiResponse({
    status: 200,
    description: 'Item removed from cart successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Cart item not found' })
  async removeFromCart(
    @Param('productId') productId: string,
    @Body() body: { variant?: string },
    @GetUser('id') userId: string,
  ) {
    const result = await this.cartsService.removeFromCart(
      productId,
      body.variant || '',
      userId,
    );
    return ApiResponseData.ok(result, 'Item removed from cart successfully');
  }

  @Delete('clear')
  @ApiOperation({ summary: 'Clear cart' })
  @ApiResponse({ status: 200, description: 'Cart cleared successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async clearCart(@GetUser('id') userId: string) {
    const result = await this.cartsService.clearCart(userId);
    return ApiResponseData.ok(result, 'Cart cleared successfully');
  }

  @Post('convert-to-order')
  @ApiOperation({ summary: 'Convert cart to order' })
  @ApiResponse({
    status: 200,
    description: 'Cart converted to order successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Cart is empty' })
  async convertToOrder(@GetUser('id') userId: string) {
    const result = await this.cartsService.convertToOrder(userId);
    return ApiResponseData.ok(result, 'Cart converted to order successfully');
  }
}
