import { Schema, models, model } from "mongoose";
import { getUser } from "../user/user.model";

const User = getUser();

const ReviewsSchema = new Schema(
  {
    review: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: User },
  },
  { timestamps: true }
);

export const Review = models.Review || model("Review", ReviewsSchema);
