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
  getCart(@GetUser('id') userId: string) {
    return this.cartsService.getCart(userId);
  }

  @Get('total')
  @ApiOperation({ summary: 'Get cart total' })
  @ApiResponse({
    status: 200,
    description: 'Cart total retrieved successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getCartTotal(@GetUser('id') userId: string) {
    return this.cartsService.getCartTotal(userId);
  }

  @Post('add')
  @ApiOperation({ summary: 'Add item to cart' })
  @ApiResponse({ status: 201, description: 'Item added to cart successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  addToCart(@Body() addToCartDto: AddToCartDto, @GetUser('id') userId: string) {
    return this.cartsService.addToCart(addToCartDto, userId);
  }

  @Patch('update')
  @ApiOperation({ summary: 'Update cart item quantity' })
  @ApiResponse({ status: 200, description: 'Cart item updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Cart item not found' })
  updateCartItem(
    @Body() updateCartItemDto: UpdateCartItemDto,
    @GetUser('id') userId: string,
  ) {
    return this.cartsService.updateCartItem(updateCartItemDto, userId);
  }

  @Delete('remove/:productId')
  @ApiOperation({ summary: 'Remove item from cart' })
  @ApiResponse({
    status: 200,
    description: 'Item removed from cart successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Cart item not found' })
  removeFromCart(
    @Param('productId') productId: string,
    @Body() body: { variant?: string },
    @GetUser('id') userId: string,
  ) {
    return this.cartsService.removeFromCart(
      productId,
      body.variant || '',
      userId,
    );
  }

  @Delete('clear')
  @ApiOperation({ summary: 'Clear cart' })
  @ApiResponse({ status: 200, description: 'Cart cleared successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  clearCart(@GetUser('id') userId: string) {
    return this.cartsService.clearCart(userId);
  }

  @Post('convert-to-order')
  @ApiOperation({ summary: 'Convert cart to order' })
  @ApiResponse({
    status: 200,
    description: 'Cart converted to order successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Cart is empty' })
  convertToOrder(@GetUser('id') userId: string) {
    return this.cartsService.convertToOrder(userId);
  }
}
