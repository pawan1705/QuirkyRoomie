import mongoose from "mongoose";
import colors from "colors";
const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("Database connected".bgGreen.white)
    );
    await mongoose.connect(`${process.env.MONGODB_URI}/auth`);
  } catch (error) {
    console.log(`Error in mongodb ${error}`.bgRed.white);
  }
};

export default connectDB;
