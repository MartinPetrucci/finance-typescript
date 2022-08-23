import mongoose from "mongoose";
import {MongoMemoryServer} from 'mongodb-memory-server'
const connectionString = process.env.CONNECTION_STRING || "";

const mongod = new MongoMemoryServer()

//connect to db
export const connect = async () => {
    const uri = await mongod.getUri()
    const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        poolSize: 10
    }
    await mongoose.connect(uri)
}

export const closeDatabase = async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongod.stop();
}
