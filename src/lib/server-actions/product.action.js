"use server";

import { connectToDatabase } from "@/database/mongoose";
import { Product } from "../../models/product/product..model";
import { revalidatePath } from "next/cache";
import Review from "../../models/review/review.model";
import { ObjectId } from "mongodb";

export const insertProduct = async (data) => {
  const {
    title,
    description,
    colors,
    imgUrl,
    category,
    originalPrice,
    discountedPrice,
  } = data;
  try {
    await connectToDatabase();
    let discountedFlage;

    if (originalPrice > discountedPrice) {
      discountedFlage = true;
    } else {
      discountedFlage = false;
    }

    await Product.create({
      title: title,
      description: description,
      colors: colors,
      category: category,
      imageUrl: imgUrl,
      originalPrice: originalPrice,
      discountedPrice: discountedPrice,
      discountedFlage: discountedFlage,
    });

    revalidatePath("/admin/dashboard");
  } catch (error) {
    throw error;
  }
};

export const getProducts = async (searchQuery) => {
  let query;
  if (searchQuery) {
    query = { category: searchQuery };
  }
  try {
    await connectToDatabase();
    const products = await Product.find(query);

    return JSON.stringify(products);
  } catch (error) {
    throw error;
  }
};

export const getProductById = async (id) => {
  let product;
  try {
    await connectToDatabase();
    product = await Product.findById(id);

    return JSON.stringify(product);
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (id, data) => {
  try {
    const {
      title,
      description,
      colors,
      imgUrl,
      category,
      originalPrice,
      discountedPrice,
    } = data;

    await connectToDatabase();

    let discountedFlage;

    if (originalPrice > discountedPrice) {
      discountedFlage = true;
    } else {
      discountedFlage = false;
    }

    const product = await Product.findByIdAndUpdate(
      id,
      {
        title: title,
        description: description,
        colors: colors,
        category: category,
        imageUrl: imgUrl,
        originalPrice: originalPrice,
        discountedPrice: discountedPrice,
        discountedFlage: discountedFlage,
      },
      {
        new: true,
      }
    );

    revalidatePath("/admin/dashboard");
  } catch (error) {
    throw error;
  }
};

export const makeRating = async ({ rating, productId, user }) => {
  try {
    await connectToDatabase();

    const product = await Product.findByIdAndUpdate(productId, {
      $push: { rating: { user: user, rating: rating } },
    });

    revalidatePath(`/products/${product}`);
  } catch (error) {
    throw error;
  }
};

export const getProductRatingOfUser = async ({ productId }) => {
  try {
    const [productRating] = await Product.aggregate([
      { $match: { _id: new ObjectId(productId) } },
      { $project: { _id: 0, rating: 1 } },
    ]);

    return productRating;
  } catch (error) {
    throw error;
  }
};

export const getProductRating = async (productId) => {
  try {
    const [productRating] = await Product.aggregate([
      { $match: { _id: new ObjectId(productId) } },
      { $project: { _id: 0, rating: 1 } },
      { $unwind: "$rating" },
      { $group: { _id: null, totalRating: { $sum: "$rating.rating" } } },
    ]);

    return productRating;
  } catch (error) {
    throw error;
  }
};

export const getTotalNumberOfReviews = async (productId) => {
  try {
    const [totalNumberOfReviews] = await Product.aggregate([
      { $match: { _id: new ObjectId(productId) } },
      { $project: { _id: 0, numberOfReviews: { $size: "$numberOfReviews" } } },
    ]);

    return totalNumberOfReviews;
  } catch (error) {
    throw error;
  }
};

export const getDiscountedProducts = async () => {
  try {
    const discountedProducts = await Product.find({
      $expr: { $gt: ["$originalPrice", "$discountedPrice"] },
    }).limit(4);

    return JSON.stringify(discountedProducts);
  } catch (error) {
    throw error;
  }
};

export const getNotSaleProducts = async () => {
  try {
    const discountedProducts = await Product.find({
      $expr: { $eq: ["$discountedPrice", "$originalPrice"] },
    }).limit(4);

    return JSON.stringify(discountedProducts);
  } catch (error) {
    throw error;
  }
};

export const searchProducts = async (searchQuery) => {
  let query = {};
  if (searchQuery) {
    query.$or = [
      { title: { $regex: new RegExp(searchQuery, "i") } },
      { description: { $regex: new RegExp(searchQuery, "i") } },
    ];
  }
  try {
    const products = await Product.find({
      $or: [
        { title: { $regex: new RegExp(searchQuery, "i") } },
        { description: { $regex: new RegExp(searchQuery, "i") } },
      ],
    });

    return JSON.stringify(products);
  } catch (error) {
    throw error;
  }
};
