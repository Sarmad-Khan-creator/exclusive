"use server";

import { revalidatePath } from "next/cache";
import { getUser } from "../../models/user/user.model";
import { hashPassword, verifyPassword } from "../encryption/encryption";
import { connectToDatabase } from "@/database/mongoose";
import { UpdatePasswordSchema } from "../validations";
const User = getUser();

export const createUser = async (data) => {
  try {
    await connectToDatabase();
    const { name, email, password } = data;

    const hashedPassword = await hashPassword(password);

    const existingUser = await User.findOne({
      email: { $regex: new RegExp(email, "i") },
    });

    if (existingUser && !existingUser.password) {
      await User.findOneAndUpdate(
        {
          email: { $regex: new RegExp(existingUser.email, "i") },
        },
        {
          $set: { password: hashedPassword },
        }
      );

      return;
    }

    if (existingUser && existingUser.password) {
      return { error: "User with same email already exists" };
    }

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  } catch (error) {
    throw error;
  }
};

export const findUser = async (data) => {
  try {
    await connectToDatabase();
    const { email } = data;

    const user = await User.findOne({
      email: { $regex: new RegExp(email, "i") },
    });

    if (!user) {
      return new Error("User not found");
    }
    return user;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (data) => {
  try {
    connectToDatabase();
    const { prevEmail, name, email, address } = data;

    const user = await User.findOneAndUpdate(
      {
        email: { $regex: new RegExp(prevEmail, "i") },
      },
      {
        $set: {
          name: name,
          email: email,
          address: address,
        },
      }
    );

    revalidatePath("/user/account/profile");
    return user;
  } catch (error) {
    throw error;
  }
};

export const updatePassword = async (email, data) => {
  const validateData = UpdatePasswordSchema.safeParse(data);

  if (!validateData.success) {
    return { error: "Invalid password" };
  }

  const { currentPassword, newPassword, confirmPassword } = validateData.data;

  try {
    connectToDatabase();
    const user = await User.findOne({
      email: { $regex: new RegExp(email, "i") },
    });

    if (!user) {
      return { error: "User not found" };
    }

    console.log(currentPassword, user.password);

    const matchPassword = await verifyPassword(currentPassword, user.password);

    if (!matchPassword) {
      return { error: "Current Passowrd is not match" };
    }

    if (newPassword !== confirmPassword) {
      return { error: "New password and confirm password not match" };
    }

    const hashedPassword = await hashPassword(newPassword);

    await User.findOneAndUpdate(
      { email: user.email },
      { password: hashedPassword }
    );

    return { error: "" };
  } catch (error) {
    throw error;
  }
};
