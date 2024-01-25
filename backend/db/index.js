import mongoose from "mongoose";

const connectToDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDb connected! HOST : ${connectionInstance.connection.host}`);
    } catch (e) {
        console.log("MongoDB connection error", e);
        process.exit(1)
    }
}

export default connectToDB