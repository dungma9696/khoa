import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review, ReviewDocument } from './schemas/review.schema';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
  ) {}

  async create(
    createReviewDto: CreateReviewDto,
    userId: string,
  ): Promise<Review> {
    // Check if user already reviewed this product
    const existingReview = await this.reviewModel
      .findOne({
        user: userId,
        product: createReviewDto.product,
      })
      .exec();

    if (existingReview) {
      throw new BadRequestException('You have already reviewed this product');
    }

    const createdReview = new this.reviewModel({
      ...createReviewDto,
      user: userId,
    });

    return createdReview.save();
  }

  async findAll(): Promise<Review[]> {
    return this.reviewModel
      .find()
      .populate('user', 'name email')
      .populate('product', 'name')
      .exec();
  }

  async findByProduct(productId: string): Promise<Review[]> {
    return this.reviewModel
      .find({ product: productId, status: 'approved' })
      .populate('user', 'name email')
      .exec();
  }

  async findByUser(userId: string): Promise<Review[]> {
    return this.reviewModel
      .find({ user: userId })
      .populate('product', 'name thumbnail')
      .exec();
  }

  async findOne(id: string): Promise<Review> {
    const review = await this.reviewModel
      .findById(id)
      .populate('user', 'name email')
      .populate('product', 'name')
      .exec();

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    return review;
  }

  async update(id: string, updateReviewDto: UpdateReviewDto): Promise<Review> {
    const updatedReview = await this.reviewModel
      .findByIdAndUpdate(id, updateReviewDto, { new: true })
      .populate('user', 'name email')
      .populate('product', 'name')
      .exec();

    if (!updatedReview) {
      throw new NotFoundException('Review not found');
    }

    return updatedReview;
  }

  async remove(id: string): Promise<void> {
    const result = await this.reviewModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Review not found');
    }
  }

  async approveReview(id: string): Promise<Review> {
    return this.update(id, { status: 'approved' });
  }

  async rejectReview(id: string): Promise<Review> {
    return this.update(id, { status: 'rejected' });
  }

  async getProductRating(
    productId: string,
  ): Promise<{ average: number; count: number }> {
    const reviews = await this.reviewModel
      .find({ product: productId, status: 'approved' })
      .exec();

    if (reviews.length === 0) {
      return { average: 0, count: 0 };
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const average = totalRating / reviews.length;

    return { average: Math.round(average * 10) / 10, count: reviews.length };
  }
}
