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
import { ReviewsService } from './reviews.service';
import { UpdateReviewDto } from './dto/update-review.dto';
import { JwtAuthGuard } from '../auth/passport/jwt-auth.guard';
import { ApiResponseData } from 'src/common/bases/api-response';

@ApiTags('Admin - Reviews')
@Controller('admin/reviews')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AdminReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all reviews (Admin)' })
  @ApiResponse({ status: 200, description: 'Reviews retrieved successfully' })
  async findAll() {
    const result = await this.reviewsService.findAll();
    return ApiResponseData.ok(result, 'Reviews retrieved successfully');
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a review by ID (Admin)' })
  @ApiResponse({ status: 200, description: 'Review retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Review not found' })
  async findOne(@Param('id') id: string) {
    const result = await this.reviewsService.findOne(id);
    return ApiResponseData.ok(result, 'Review retrieved successfully');
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a review (Admin)' })
  @ApiResponse({ status: 200, description: 'Review updated successfully' })
  @ApiResponse({ status: 404, description: 'Review not found' })
  async update(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    const result = await this.reviewsService.update(id, updateReviewDto);
    return ApiResponseData.ok(result, 'Review updated successfully');
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a review (Admin)' })
  @ApiResponse({ status: 200, description: 'Review deleted successfully' })
  @ApiResponse({ status: 404, description: 'Review not found' })
  async remove(@Param('id') id: string) {
    await this.reviewsService.remove(id);
    return ApiResponseData.ok(true, 'Review deleted successfully');
  }

  @Patch(':id/approve')
  @ApiOperation({ summary: 'Approve a review (Admin)' })
  @ApiResponse({ status: 200, description: 'Review approved successfully' })
  @ApiResponse({ status: 404, description: 'Review not found' })
  async approveReview(@Param('id') id: string) {
    const result = await this.reviewsService.approveReview(id);
    return ApiResponseData.ok(result, 'Review approved successfully');
  }

  @Patch(':id/reject')
  @ApiOperation({ summary: 'Reject a review (Admin)' })
  @ApiResponse({ status: 200, description: 'Review rejected successfully' })
  @ApiResponse({ status: 404, description: 'Review not found' })
  async rejectReview(@Param('id') id: string) {
    const result = await this.reviewsService.rejectReview(id);
    return ApiResponseData.ok(result, 'Review rejected successfully');
  }
}
