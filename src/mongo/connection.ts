import mongoose from "mongoose";
const connection = process.env.CONNECTION_STRING || "";

mongoose
  .connect(connection)
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err);
  });
