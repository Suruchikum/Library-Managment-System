import mongoose from "mongoose";
export const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      dbName: "library",
    })
    .then(() => {
      console.log("Database connected succesfully");
    })
    .catch((err) => {
      console.log("Error connecting to database", err);
    });
};
