import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  SubCategory,
  SubCategoryDocument,
} from './schemas/sub-category.schema';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';

@Injectable()
export class SubCategoriesService {
  constructor(
    @InjectModel(SubCategory.name)
    private subCategoryModel: Model<SubCategoryDocument>,
  ) {}

  async create(
    createSubCategoryDto: CreateSubCategoryDto,
  ): Promise<SubCategory> {
    const createdSubCategory = new this.subCategoryModel(createSubCategoryDto);
    return createdSubCategory.save();
  }

  async findAll(): Promise<SubCategory[]> {
    return this.subCategoryModel
      .find({ status: 'active' })
      .populate('category')
      .exec();
  }

  async findByCategory(categoryId: string): Promise<SubCategory[]> {
    return this.subCategoryModel
      .find({ category: categoryId, status: 'active' })
      .exec();
  }

  async findOne(id: string): Promise<SubCategory> {
    const subCategory = await this.subCategoryModel
      .findById(id)
      .populate('category')
      .exec();
    if (!subCategory) {
      throw new NotFoundException('Sub-category not found');
    }
    return subCategory;
  }

  async update(
    id: string,
    updateSubCategoryDto: UpdateSubCategoryDto,
  ): Promise<SubCategory> {
    const updatedSubCategory = await this.subCategoryModel
      .findByIdAndUpdate(id, updateSubCategoryDto, { new: true })
      .populate('category')
      .exec();

    if (!updatedSubCategory) {
      throw new NotFoundException('Sub-category not found');
    }

    return updatedSubCategory;
  }

  async remove(id: string): Promise<void> {
    const result = await this.subCategoryModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Sub-category not found');
    }
  }
}
