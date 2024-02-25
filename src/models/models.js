// import { Schema, models, model } from "mongoose";

// export const getProduct = () => {
//   const Product = models.Product || model("Product", ProductSchema);

//   return Product;
// };

// const Product = getProduct();

// const UserSchema = new Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: String,
//     address: String,
//     whishlist: [{ type: Schema.Types.ObjectId, ref: Product }],
//     cart: [{ type: Schema.Types.ObjectId, ref: Product }],
//     orders: [{ type: Schema.Types.ObjectId, ref: Product }],
//   },
//   {
//     timestamps: true,
//   }
// );

// export const User = models.User || model("User", UserSchema);

// const ReviewsSchema = new Schema({
//   review: { type: String, required: true },
//   author: { type: Schema.Types.ObjectId, ref: User },
// });

// export const Review = models.Review || model("Review", ReviewsSchema);

// const ProductSchema = new Schema(
//   {
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     imageUrl: [String],
//     rating: { type: Number, default: 0 },
//     numberOfReviews: [{ type: Schema.Types.ObjectId, ref: User }],
//     reviews: [{ type: Schema.Types.ObjectId, ref: Review }],
//     colors: [String],
//     category: String,
//     originalPrice: String,
//     discountedPrice: String,
//     discountedFlage: Boolean,
//   },
//   { timestamps: true }
// );
