<<<<<<< HEAD
// import mongoose from 'mongoose';

// export const connectDB = async () => {
//   const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/technical-blog';

//   try {
//     await mongoose.connect(mongoURI);
//     console.log(`MongoDB connected: ${mongoose.connection.host}`);
//   } catch (error) {
//     console.error('MongoDB connection failed:', error.message);
//     process.exit(1);
//   }
// };

import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error);
=======
import mongoose from 'mongoose';

export const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/technical-blog';

  try {
    await mongoose.connect(mongoURI);
    console.log(`MongoDB connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
>>>>>>> 7a128ed1b4280188d3e16a6c3f9dcf1f14539422
    process.exit(1);
  }
};
