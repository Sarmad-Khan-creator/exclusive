import { Schema, models, model } from "mongoose";
import { Product } from "../product/product..model";
import { getUser } from "../user/user.model";

const User = getUser();

const CartSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: Product },
  user: { type: Schema.Types.ObjectId, ref: User },
  quantity: { type: Number, default: 1 },
  subTotal: Number,
});

const Cart = models.Cart || model("Cart", CartSchema);

export default Cart;
