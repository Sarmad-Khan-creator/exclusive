"use server";

import { connectToDatabase } from "@/database/mongoose";
import Message from "@/models/message/message.model";

export const sendMessage = async ({ name, email, phone, message }) => {
  try {
    await connectToDatabase();

    await Message.create({
      name,
      email,
      phone,
      message,
    });
  } catch (error) {
    throw error;
  }
};
