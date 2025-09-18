import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async()=>{
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log("Database Connection Successful");``
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDB;