import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Discount, DiscountDocument } from './schemas/discount.schema';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { ApplyDiscountDto } from './dto/apply-discount.dto';

@Injectable()
export class DiscountsService {
  constructor(
    @InjectModel(Discount.name) private discountModel: Model<DiscountDocument>,
  ) {}

  async create(createDiscountDto: CreateDiscountDto): Promise<Discount> {
    // Check if code already exists
    const existingDiscount = await this.discountModel
      .findOne({
        code: createDiscountDto.code.toUpperCase(),
      })
      .exec();

    if (existingDiscount) {
      throw new BadRequestException('Discount code already exists');
    }

    const createdDiscount = new this.discountModel({
      ...createDiscountDto,
      code: createDiscountDto.code.toUpperCase(),
    });

    return createdDiscount.save();
  }

  async findAll(): Promise<Discount[]> {
    return this.discountModel.find().exec();
  }

  async findActive(): Promise<Discount[]> {
    const now = new Date();
    return this.discountModel
      .find({
        status: 'active',
        startDate: { $lte: now },
        endDate: { $gte: now },
      })
      .exec();
  }

  async findOne(id: string): Promise<Discount> {
    const discount = await this.discountModel.findById(id).exec();
    if (!discount) {
      throw new NotFoundException('Discount not found');
    }
    return discount;
  }

  async findByCode(code: string): Promise<Discount> {
    const discount = await this.discountModel
      .findOne({
        code: code.toUpperCase(),
      })
      .exec();

    if (!discount) {
      throw new NotFoundException('Discount code not found');
    }

    return discount;
  }

  async update(
    id: string,
    updateDiscountDto: UpdateDiscountDto,
  ): Promise<Discount> {
    if (updateDiscountDto.code) {
      // Check if new code already exists
      const existingDiscount = await this.discountModel
        .findOne({
          code: updateDiscountDto.code.toUpperCase(),
          _id: { $ne: id },
        })
        .exec();

      if (existingDiscount) {
        throw new BadRequestException('Discount code already exists');
      }

      updateDiscountDto.code = updateDiscountDto.code.toUpperCase();
    }

    const updatedDiscount = await this.discountModel
      .findByIdAndUpdate(id, updateDiscountDto, { new: true })
      .exec();

    if (!updatedDiscount) {
      throw new NotFoundException('Discount not found');
    }

    return updatedDiscount;
  }

  async remove(id: string): Promise<void> {
    const result = await this.discountModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Discount not found');
    }
  }

  async applyDiscount(
    applyDiscountDto: ApplyDiscountDto,
    orderValue: number,
  ): Promise<{
    discount: Discount;
    discountAmount: number;
    finalAmount: number;
  }> {
    const discount = await this.findByCode(applyDiscountDto.code);
    const now = new Date();

    // Check if discount is active
    if (discount.status !== 'active') {
      throw new BadRequestException('Discount is not active');
    }

    // Check date validity
    if (discount.startDate > now || discount.endDate < now) {
      throw new BadRequestException('Discount is not valid at this time');
    }

    // Check usage limit
    if (discount.usageLimit > 0 && discount.usedCount >= discount.usageLimit) {
      throw new BadRequestException('Discount usage limit exceeded');
    }

    // Check minimum order value
    if (discount.minOrderValue > 0 && orderValue < discount.minOrderValue) {
      throw new BadRequestException(
        `Minimum order value is ${discount.minOrderValue}`,
      );
    }

    let discountAmount = 0;

    if (discount.type === 'percentage') {
      discountAmount = (orderValue * discount.percentage) / 100;

      // Apply maximum discount amount if set
      if (
        discount.maxDiscountAmount > 0 &&
        discountAmount > discount.maxDiscountAmount
      ) {
        discountAmount = discount.maxDiscountAmount;
      }
    } else if (discount.type === 'fixed_amount') {
      discountAmount = discount.amount;
    }

    const finalAmount = Math.max(0, orderValue - discountAmount);

    return {
      discount,
      discountAmount,
      finalAmount,
    };
  }

  async incrementUsage(discountId: string): Promise<Discount> {
    const discount = await this.discountModel
      .findByIdAndUpdate(discountId, { $inc: { usedCount: 1 } }, { new: true })
      .exec();

    if (!discount) {
      throw new NotFoundException('Discount not found');
    }

    return discount;
  }

  async updateDiscountStatus(): Promise<void> {
    const now = new Date();

    // Mark expired discounts
    await this.discountModel
      .updateMany(
        { endDate: { $lt: now }, status: 'active' },
        { status: 'expired' },
      )
      .exec();
  }

  async getDiscountStats(): Promise<{
    total: number;
    active: number;
    expired: number;
    inactive: number;
  }> {
    const stats = await this.discountModel.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    const result = {
      total: 0,
      active: 0,
      expired: 0,
      inactive: 0,
    };

    stats.forEach((stat) => {
      result.total += stat.count;
      result[stat._id] = stat.count;
    });

    return result;
  }
}
