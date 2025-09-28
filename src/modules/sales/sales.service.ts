import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sale, SaleDocument } from './schemas/sale.schema';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Injectable()
export class SalesService {
  constructor(@InjectModel(Sale.name) private saleModel: Model<SaleDocument>) {}

  async create(createSaleDto: CreateSaleDto): Promise<Sale> {
    const startDate = new Date(createSaleDto.startDate);
    const endDate = new Date(createSaleDto.endDate);

    if (startDate >= endDate) {
      throw new BadRequestException('End date must be after start date');
    }

    const createdSale = new this.saleModel(createSaleDto);
    return createdSale.save();
  }

  async findAll(): Promise<Sale[]> {
    return this.saleModel
      .find()
      .populate('product', 'name thumbnail price')
      .populate('user', 'name email')
      .populate('discount', 'name code value type')
      .exec();
  }

  async findActive(): Promise<Sale[]> {
    const now = new Date();
    return this.saleModel
      .find({
        status: 'active',
        startDate: { $lte: now },
        endDate: { $gte: now },
      })
      .populate('product', 'name thumbnail price')
      .populate('discount', 'name code value type')
      .exec();
  }

  async findOne(id: string): Promise<Sale> {
    const sale = await this.saleModel
      .findById(id)
      .populate('product', 'name thumbnail price')
      .populate('user', 'name email')
      .populate('discount', 'name code value type')
      .exec();

    if (!sale) {
      throw new NotFoundException('Sale not found');
    }

    return sale;
  }

  async update(id: string, updateSaleDto: UpdateSaleDto): Promise<Sale> {
    if (updateSaleDto.startDate && updateSaleDto.endDate) {
      const startDate = new Date(updateSaleDto.startDate);
      const endDate = new Date(updateSaleDto.endDate);

      if (startDate >= endDate) {
        throw new BadRequestException('End date must be after start date');
      }
    }

    const updatedSale = await this.saleModel
      .findByIdAndUpdate(id, updateSaleDto, { new: true })
      .populate('product', 'name thumbnail price')
      .populate('user', 'name email')
      .populate('discount', 'name code value type')
      .exec();

    if (!updatedSale) {
      throw new NotFoundException('Sale not found');
    }

    return updatedSale;
  }

  async remove(id: string): Promise<void> {
    const result = await this.saleModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Sale not found');
    }
  }

  async getSalesForProduct(productId: string): Promise<Sale[]> {
    const now = new Date();
    return this.saleModel
      .find({
        product: productId,
        status: 'active',
        startDate: { $lte: now },
        endDate: { $gte: now },
      })
      .populate('discount', 'name code value type')
      .exec();
  }

  async getSalesForUser(userId: string): Promise<Sale[]> {
    const now = new Date();
    return this.saleModel
      .find({
        $or: [
          { user: userId },
          { targetCustomer: 'all' },
          { targetCustomer: 'new_customers' },
        ],
        status: 'active',
        startDate: { $lte: now },
        endDate: { $gte: now },
      })
      .populate('product', 'name thumbnail price')
      .populate('discount', 'name code value type')
      .exec();
  }

  async updateSaleStatus(): Promise<void> {
    const now = new Date();

    // Mark expired sales
    await this.saleModel
      .updateMany(
        { endDate: { $lt: now }, status: 'active' },
        { status: 'expired' },
      )
      .exec();
  }

  async getSaleStats(): Promise<{
    total: number;
    active: number;
    expired: number;
    inactive: number;
  }> {
    const stats = await this.saleModel.aggregate([
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
