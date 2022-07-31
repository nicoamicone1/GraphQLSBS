import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(
    `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@sbschallenge.vs2kjtc.mongodb.net/?retryWrites=true&w=majority`,{})
  .then(() => {
    console.log("connected to database");
  })
  .catch((error) => {
    console.error(error);
  });
