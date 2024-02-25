"use server";

import { connectToDatabase } from "@/database/mongoose";
import Cart from "@/models/cart/cart.model";
import { Product } from "@/models/product/product..model";
import { revalidatePath } from "next/cache";

export async function getCartItem(userId, productId) {
  try {
    await connectToDatabase();
    const cartItems = await Cart.findOne({
      user: userId,
      product: productId,
    });

    return JSON.stringify(cartItems);
  } catch (e) {
    throw e;
  }
}

export async function addToCart({ productId, userId }) {
  try {
    await connectToDatabase();

    const product = await Product.findById(productId);

    let subTotal;

    if (product.originalPrice !== product.discountedPrice) {
      subTotal = product.discountedPrice;
    } else {
      subTotal = product.originalPrice;
    }
    const cartItem = await Cart.create({
      product: productId,
      user: userId,
      quantity: 1,
      subTotal: subTotal,
    });

    revalidatePath("/");
  } catch (error) {
    throw error;
  }
}

export async function removeFromCart({ productId, userId }) {
  try {
    await connectToDatabase();
    const cartItem = await Cart.findOneAndDelete({
      product: productId,
      user: userId,
    });

    revalidatePath("/");
  } catch (error) {
    throw error;
  }
}

export async function getAllAddedToCartItems({ userId }) {
  try {
    await connectToDatabase();
    const cartItems = await Cart.find({ user: userId }).populate({
      path: "product",
      model: Product,
    });

    return JSON.stringify(cartItems);
  } catch (error) {
    throw error;
  }
}

export async function updateProductInCart({ productId, quantity, subTotal }) {
  try {
    await connectToDatabase();

    await Cart.findByIdAndUpdate(productId, {
      quantity,
      subTotal,
    });

    revalidatePath("/user/cart");
  } catch (error) {
    throw error;
  }
}

export async function getTotalPrice({ user }) {
  try {
    await connectToDatabase();

    const [totalPrice] = await Cart.aggregate([
      { $match: { user: user } },
      { $project: { _id: 0, subTotal: 1 } },
      { $group: { _id: null, totalPrice: { $sum: "$subTotal" } } },
    ]);

    revalidatePath("/user/cart");
    return totalPrice;
  } catch (error) {
    throw error;
  }
}
