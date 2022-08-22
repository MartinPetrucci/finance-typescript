import { model, Schema } from "mongoose";
import { IMovement, movementSchema } from "./Movement";

export interface IMonth {
  date: string;
  incomes: {
    total: number;
    movements: IMovement[];
  };
  expenses: {
    total: number;
    movements: IMovement[];
  };
}

export const monthSchema = new Schema<IMonth>({
  date: String,
  incomes: {
    total: Number,
    movements: [movementSchema],
  },
  expenses: {
    total: Number,
    movements: [movementSchema],
  },
});

monthSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const Month = model<IMonth>("Month", monthSchema);
