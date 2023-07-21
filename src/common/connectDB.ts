import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}`, {
            ssl: true,
        });
        console.log("Server connected successfully to database");
    } catch (error: any) {
        console.log(error.message);
    }
};

module.exports = { connectDB };