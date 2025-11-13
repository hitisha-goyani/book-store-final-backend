import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);

    return connect; 
    
  } catch (error) {
    console.log(error.message)
  }
};

export default connectDb;

