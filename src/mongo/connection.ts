import mongoose from "mongoose";
const connectionString = process.env.CONNECTION_STRING || "";

mongoose.connect(connectionString).then((res) => {
  console.log('db connected')
}).catch((err) => {
  console.log('error while connecting db', err)
})

