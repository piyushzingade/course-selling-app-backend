import mongoose from "mongoose";
export const connectTODB = async () => {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
};