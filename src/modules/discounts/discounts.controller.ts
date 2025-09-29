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
import { ApplyDiscountDto } from './dto/apply-discount.dto';
import { JwtAuthGuard } from '../auth/passport/jwt-auth.guard';
import { ApiResponseData } from 'src/common/bases/api-response';

@ApiTags('Discounts')
@Controller('discounts')
export class DiscountsController {
  constructor(private readonly discountsService: DiscountsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all active discounts' })
  @ApiResponse({ status: 200, description: 'Discounts retrieved successfully' })
  async findAll() {
    const result = await this.discountsService.findActive();
    return ApiResponseData.ok(result, 'Discounts retrieved successfully');
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a discount by ID' })
  @ApiResponse({ status: 200, description: 'Discount retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Discount not found' })
  async findOne(@Param('id') id: string) {
    const result = await this.discountsService.findOne(id);
    return ApiResponseData.ok(result, 'Discount retrieved successfully');
  }

  @Post('apply')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Apply a discount code' })
  @ApiResponse({ status: 200, description: 'Discount applied successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Invalid discount code' })
  async applyDiscount(
    @Body() applyDiscountDto: ApplyDiscountDto,
    @Body() body: { orderValue: number },
  ) {
    const result = await this.discountsService.applyDiscount(
      applyDiscountDto,
      body.orderValue,
    );
    return ApiResponseData.ok(result, 'Discount applied successfully');
  }
}
