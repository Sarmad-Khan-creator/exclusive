import { model, models, Schema } from "mongoose";

export function getUser() {
  const UserSchema = new Schema(
    {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: String,
      address: String,
    },
    {
      timestamps: true,
    }
  );

  const User = models.User || model("User", UserSchema);

  return User;
}
