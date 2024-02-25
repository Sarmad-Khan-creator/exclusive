import { Schema, models, model } from "mongoose";
import { Product } from "../product/product..model";
import { getUser } from "../user/user.model";

const User = getUser();

const OrderSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: Product },
  user: { type: Schema.Types.ObjectId, ref: User },
});

const Order = models.Order || model("Order", OrderSchema);

export default Order;
