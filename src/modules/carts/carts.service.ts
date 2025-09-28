import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from './schemas/cart.schema';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Injectable()
export class CartsService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<CartDocument>) {}

  async getOrCreateCart(userId: string): Promise<Cart> {
    let cart = await this.cartModel.findOne({ user: userId }).exec();

    if (!cart) {
      cart = new this.cartModel({ user: userId, items: [] });
      await cart.save();
    }

    return cart;
  }

  async addToCart(addToCartDto: AddToCartDto, userId: string): Promise<Cart> {
    const cart = await this.getOrCreateCart(userId);

    const existingItemIndex = cart.items.findIndex(
      (item) =>
        item.product.toString() === addToCartDto.product &&
        item.variant === addToCartDto.variant,
    );

    if (existingItemIndex !== -1) {
      cart.items[existingItemIndex].quantity += addToCartDto.quantity;
    } else {
      cart.items.push({
        product: addToCartDto.product as any,
        quantity: addToCartDto.quantity,
        variant: addToCartDto.variant,
      });
    }

    return (await this.cartModel
      .findByIdAndUpdate((cart as any)._id, cart, { new: true })
      .exec()) as Cart;
  }

  async updateCartItem(
    updateCartItemDto: UpdateCartItemDto,
    userId: string,
  ): Promise<Cart> {
    const cart = await this.getOrCreateCart(userId);

    const itemIndex = cart.items.findIndex(
      (item) =>
        item.product.toString() === updateCartItemDto.product &&
        item.variant === updateCartItemDto.variant,
    );

    if (itemIndex === -1) {
      throw new NotFoundException('Cart item not found');
    }

    cart.items[itemIndex].quantity = updateCartItemDto.quantity;

    return (await this.cartModel
      .findByIdAndUpdate((cart as any)._id, cart, { new: true })
      .exec()) as Cart;
  }

  async removeFromCart(
    productId: string,
    variant: string,
    userId: string,
  ): Promise<Cart> {
    const cart = await this.getOrCreateCart(userId);

    cart.items = cart.items.filter(
      (item) =>
        !(item.product.toString() === productId && item.variant === variant),
    );

    return (await this.cartModel
      .findByIdAndUpdate((cart as any)._id, cart, { new: true })
      .exec()) as Cart;
  }

  async getCart(userId: string): Promise<Cart> {
    const cart = await this.cartModel
      .findOne({ user: userId })
      .populate('items.product', 'name price thumbnail variants')
      .exec();

    if (!cart) {
      return this.getOrCreateCart(userId);
    }

    return cart;
  }

  async clearCart(userId: string): Promise<Cart> {
    const cart = await this.getOrCreateCart(userId);
    cart.items = [];
    return (await this.cartModel
      .findByIdAndUpdate((cart as any)._id, cart, { new: true })
      .exec()) as Cart;
  }

  async getCartTotal(
    userId: string,
  ): Promise<{ total: number; itemCount: number }> {
    const cart = await this.getCart(userId);

    let total = 0;
    let itemCount = 0;

    for (const item of cart.items) {
      const product = item.product as any;
      let price = product.price;

      // Apply variant price adjustment if exists
      if (item.variant && product.variants) {
        const variant = product.variants.find(
          (v: any) => v.name === item.variant,
        );
        if (variant && variant.priceAdjustment) {
          price += variant.priceAdjustment;
        }
      }

      total += price * item.quantity;
      itemCount += item.quantity;
    }

    return { total, itemCount };
  }

  async convertToOrder(userId: string): Promise<Cart> {
    const cart = await this.getCart(userId);

    if (cart.items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    cart.status = 'converted';
    return (await this.cartModel
      .findByIdAndUpdate((cart as any)._id, cart, { new: true })
      .exec()) as Cart;
  }
}
