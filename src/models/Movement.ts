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

// export const Movement = model("Movement", movementSchema);
