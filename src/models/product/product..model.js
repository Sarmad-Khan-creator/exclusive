import { Schema, models, model } from "mongoose";
import { getUser } from "../../models/user/user.model";
import { Review } from "../review/review.model";

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: [String],
    rating: [
      {
        user: { type: Schema.Types.ObjectId, ref: getUser() },
        rating: { type: Number, default: 0 },
      },
    ],
    numberOfReviews: [{ type: Schema.Types.ObjectId, ref: getUser() }],
    reviews: [{ type: Schema.Types.ObjectId, ref: Review }],
    colors: [String],
    category: String,
    originalPrice: String,
    discountedPrice: String,
    discountedFlage: Boolean,
  },
  { timestamps: true }
);

export const Product = models.Product || model("Product", ProductSchema);
