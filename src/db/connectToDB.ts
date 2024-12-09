import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()
export const connectTODB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL as string);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};
