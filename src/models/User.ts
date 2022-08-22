import { Schema, model, Types } from "mongoose";
import { IMonth, monthSchema } from "./Month";
import { movementSchema } from "./Movement";

export interface IUser {
  fullname: string;
  username: string;
  passwordHash: string;
  months: Types.DocumentArray<IMonth>
}

const userSchema = new Schema<IUser>({
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
    type: [monthSchema],
    required: true
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

export const User = model<IUser>("User", userSchema);
