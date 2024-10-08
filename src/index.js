// require('dotenv').config({path: './env'})
import dotenv from "dotenv"
import connectDB from "./db/index.js"
import { app } from "./app.js"

dotenv.config({
  path: './env'
})

connectDB()
  .then(()=>{
    app.on("error", (error) => {console.log("Server Error", error);
    }) // server error
    app.listen(process.env.PORT || 8000, () => {
      console.log(`server is running at: 
        ${process.env.PORT}`);
    })
  })
  .catch((error) => {
    console.log("Connection Failed to DataBase", error);
  })
































/** 
import express from "express"; 
const app = express();
( async () => {
  try{
    await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
    app.on("error", (error) => {
      console.log("Unable to Communicate", error);
      throw error
    })

    app.listen(process.env.PORT, () => {
      console.log(`Server started at port ${process.env.PORT}`);
    })
  }
  catch(error){
    console.error("Error", error)
  }
})()
*/
