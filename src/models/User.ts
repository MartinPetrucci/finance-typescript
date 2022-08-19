import { Schema, model } from "mongoose";
import { monthSchema } from "./Month";
import { movementSchema } from "./Movement";

const userSchema = new Schema({
  fullname: {
    type: String,
    required: [true, 'Fullname required']
  },
  username: {
    type: String,
    required: [true, 'Username required']
  },
  passwordHash: {
    type: String,
    required: [true, 'Password required']
  },
  months: {
    type: [monthSchema]
  }
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

export const User = model("User", userSchema);
