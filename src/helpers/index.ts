import { Types } from "mongoose";

export const oId = (id: string) => {
    return new Types.ObjectId(id)
}