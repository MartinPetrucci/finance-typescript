import { Schema, model } from "mongoose";

export interface IMovement {
  amount: number;
  movementType: string;
  date: Date;
  concept: string;
}

export const movementSchema = new Schema<IMovement>({
  amount: {type: Number, required: true},
  movementType: {
    type: String,
    enum: ["INCOME", "EXPENSE"],
    required: true
  },
  date: {type: Date, required: true},
  concept: {type: String, required: true},
});

movementSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    returnedObject.date = returnedObject.date.toISOString().split('T')[0]
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const Movement = model<IMovement>("Movement", movementSchema);
