import { model, Schema } from "mongoose";
import { movementSchema } from "./Movement";


export const monthSchema =  new Schema({
    date: String,
    incomes: {
        total: Number,
        movements: [movementSchema]
    },
    expenses: {
        total: Number,
        movements: [movementSchema]
    }
})

export const Month = model("Month", monthSchema)