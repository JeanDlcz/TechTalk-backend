import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";

mongoose.set('strictQuery', false);
export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
  } catch (error) {
    
    process.exit(1);
  }
};
