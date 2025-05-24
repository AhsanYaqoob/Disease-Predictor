import mongoose from "mongoose";

export const connection = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined. Check your environment variables.");
    }

    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "Disease-Predictor",
    });

    console.log("✅ Connected to database.");
  } catch (err) {
    console.error(`❌ Database connection error: ${err.message}`);
    process.exit(1);
  }
};
