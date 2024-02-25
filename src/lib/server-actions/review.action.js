"use server";

import { connectToDatabase } from "@/database/mongoose";
import { Product } from "@/models/product/product..model";
import { Review } from "@/models/review/review.model";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { getUser } from "@/models/user/user.model";

const User = getUser();

export async function createReview(data) {
  try {
    await connectToDatabase();
    const { review, author, productId } = data;

    const userReview = await Review.create({
      review: review,
      author: author,
    });

    await Product.findByIdAndUpdate(productId, {
      $push: { reviews: userReview._id, numberOfReviews: author },
    });

    revalidatePath(`/product/${productId}`);

    return userReview;
  } catch (err) {
    throw err;
  }
}

export async function getAllProductReviews(productId) {
  try {
    await connectToDatabase();

    const [allReviews] = await Product.aggregate([
      { $match: { _id: new ObjectId(productId) } },
      { $project: { _id: 0, reviews: 1, numberOfReviews: 1 } },
      {
        $lookup: {
          from: "reviews",
          localField: "reviews",
          foreignField: "_id",
          as: "reviews",
        },
      },
    ]);

    return allReviews;
  } catch (err) {
    throw err;
  }
}
