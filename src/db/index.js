import mongoose from "mongoose";

const connectDB = async () => {
  try{
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`);
    console.log(`MongoDB Connected DB HOST: ${connectionInstance.connection.host}`);  
  }
  catch(error){
    console.log("MongoDb error ocurred: ", error);
    process.exit(1)
  }
}

export default connectDB;