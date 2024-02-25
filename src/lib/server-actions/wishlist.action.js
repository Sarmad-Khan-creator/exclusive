"use server";

import { connectToDatabase } from "@/database/mongoose";
import Wishlist from "@/models/whislist/whishlist.model";
import { revalidatePath } from "next/cache";

export async function getWishlist(userId, productId) {
  try {
    await connectToDatabase();
    const wishlist = await Wishlist.findOne({
      user: userId,
      product: productId,
    });

    return JSON.stringify(wishlist);
  } catch (e) {
    throw e;
  }
}

export async function addToWishlist({ productId, userId, path }) {
  try {
    await connectToDatabase();
    const wishlist = await Wishlist.create({
      product: productId,
      user: userId,
    });

    revalidatePath(path);
    return wishlist;
  } catch (error) {
    throw error;
  }
}

export async function removeFromWishlist({ productId, userId, path }) {
  try {
    await connectToDatabase();
    const wishlist = await Wishlist.findOneAndDelete({
      product: productId,
      user: userId,
    });

    revalidatePath(path);
    return wishlist;
  } catch (error) {
    throw error;
  }
}

export async function getAllwhishlistedProductsForUser({ userId }) {
  try {
    await connectToDatabase();
    const wishlistedProduct = await Wishlist.find({
      user: userId,
    }).populate({ path: "product", model: "Product" });

    return JSON.stringify(wishlistedProduct);
  } catch (error) {
    throw error;
  }
}
