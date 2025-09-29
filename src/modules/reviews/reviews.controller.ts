import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { JwtAuthGuard } from '../auth/passport/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { ApiResponseData } from 'src/common/bases/api-response';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new review' })
  @ApiResponse({ status: 201, description: 'Review created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad request - already reviewed' })
  async create(
    @Body() createReviewDto: CreateReviewDto,
    @GetUser('id') userId: string,
  ) {
    const result = await this.reviewsService.create(createReviewDto, userId);
    return ApiResponseData.ok(result, 'Review created successfully');
  }

  @Get()
  @ApiOperation({ summary: 'Get all reviews' })
  @ApiResponse({ status: 200, description: 'Reviews retrieved successfully' })
  async findAll() {
    const result = await this.reviewsService.findAll();
    return ApiResponseData.ok(result, 'Reviews retrieved successfully');
  }

  @Get('product/:productId')
  @ApiOperation({ summary: 'Get reviews by product' })
  @ApiResponse({ status: 200, description: 'Reviews retrieved successfully' })
  async findByProduct(@Param('productId') productId: string) {
    const result = await this.reviewsService.findByProduct(productId);
    return ApiResponseData.ok(result, 'Reviews retrieved successfully');
  }

  @Get('product/:productId/rating')
  @ApiOperation({ summary: 'Get product rating summary' })
  @ApiResponse({
    status: 200,
    description: 'Product rating retrieved successfully',
  })
  async getProductRating(@Param('productId') productId: string) {
    const result = await this.reviewsService.getProductRating(productId);
    return ApiResponseData.ok(result, 'Product rating retrieved successfully');
  }

  @Get('my-reviews')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user reviews' })
  @ApiResponse({
    status: 200,
    description: 'User reviews retrieved successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findByUser(@GetUser('id') userId: string) {
    const result = await this.reviewsService.findByUser(userId);
    return ApiResponseData.ok(result, 'User reviews retrieved successfully');
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a review by ID' })
  @ApiResponse({ status: 200, description: 'Review retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Review not found' })
  async findOne(@Param('id') id: string) {
    const result = await this.reviewsService.findOne(id);
    return ApiResponseData.ok(result, 'Review retrieved successfully');
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a review' })
  @ApiResponse({ status: 200, description: 'Review updated successfully' })
  @ApiResponse({ status: 404, description: 'Review not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    const result = await this.reviewsService.update(id, updateReviewDto);
    return ApiResponseData.ok(result, 'Review updated successfully');
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a review' })
  @ApiResponse({ status: 200, description: 'Review deleted successfully' })
  @ApiResponse({ status: 404, description: 'Review not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async remove(@Param('id') id: string) {
    await this.reviewsService.remove(id);
    return ApiResponseData.ok(true, 'Review deleted successfully');
  }
}
