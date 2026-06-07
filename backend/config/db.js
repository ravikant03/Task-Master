import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGO_URI);

    console.log("Mongodb connected");
  } catch (error) {
    console.log("MongoDb connection error");
  }
};

export default connectDB;
