import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB Successfull")
    } catch (error) {
        console.error(`Error ${error.message}`);
        process.exit();
    }

}


export default connectDB;