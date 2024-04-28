import mongoose from "mongoose";

export const mongoConnect = () => {
  mongoose
    .connect(process.env.DATABASE_URI!)
    .then(() => {
      console.log("connected to database");
    })
    .catch((err) => {
      console.log(err);
    });
};
