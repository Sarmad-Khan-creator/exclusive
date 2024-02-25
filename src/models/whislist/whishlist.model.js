import { Schema, models, model } from "mongoose";
import { Product } from "../product/product..model";
import { getUser } from "../user/user.model";

const User = getUser();

const WishlistSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: Product },
  user: { type: Schema.Types.ObjectId, ref: User },
});

const Wishlist = models.Whislist || model("Whislist", WishlistSchema);

export default Wishlist;
