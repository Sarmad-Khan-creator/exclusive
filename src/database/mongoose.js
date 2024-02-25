import mongoose from "mongoose";
let isConnected = false;
export const connectToDatabase = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.log("No MONGODB_URI found");
      return;
    }

    if (isConnected) {
      return;
    }

    mongoose.set("strictQuery", true);

    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "exclusive-shop",
    });

    console.log("Connect to Database");
    isConnected = true;
  } catch (error) {
    throw error;
  }
};
