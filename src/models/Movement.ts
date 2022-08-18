import { Schema, model } from "mongoose";

export const movementSchema = new Schema({
  amount: Number,
  movementType: {
    type: String,
    enum: ["INCOME", "EXPENSE"],
  },
  date: Date,
  concept: String,
});

movementSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    returnedObject.date = returnedObject.date.toISOString().split('T')[0]
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});


export const Movement = model("Movement", movementSchema);
