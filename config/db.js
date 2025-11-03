import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    const connect = await mongoose.connect("mongodb://localhost:27017/bookstore");

    return connect; 
    
  } catch (error) {
    console.log(error.message)
  }
};

export default connectDb;

