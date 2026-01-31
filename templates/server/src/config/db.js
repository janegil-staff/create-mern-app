import mongoose from "mongoose";

export async function connectDB() {
  if (!process.env.MONGO_URI) {
    return "*** Please add .env variable MONGO_URI to you .env file ***";
  }
  
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
}
