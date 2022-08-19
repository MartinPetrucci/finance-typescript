import { Types } from "mongoose"
import { oId } from "../helpers";
import { Movement } from "../models/Movement";
import { User } from "../models/User";
const movementsService = {
  getTotalBalance: async (userId: string) => {
    const user = await User.findOne({ _id: userId });
    console.log({ user });
    // const movements = user?.toJSON().movements;
    // console.log({ movements });
  },
  getMovements: async (userId: string) => {
    const user = await User.findOne({ _id: oId(userId) });
    // const movements = user?.toJSON().movements;
    // return movements;
    return []
  },
  addMovement: async (userId: string) => {
    const newMovement = new Movement({
      amount: 35000,
      concept: "El distinto",
      date: new Date(2022, 7, 31),
      movementType: "EXPENSE",
    });

    // const movs = createMovements(500)
    // movs.forEach((mov) => {
    //   console.log(mov.toJSON())
    // })
    try {
      const response = await User.findOneAndUpdate(
        { _id: oId(userId) },
        {
          $push: {
            movements: {
                $each: [newMovement],
                $sort: {date: -1} 
            }
          },
        }
      );
      console.log('arre',response)
    } catch (error) {
        console.log({error})
    }
  },
};

const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const createMovements = (amount: number) => {
  let movements = []
    for(let i = 0; i < amount; i++) {
      const newMovement = new Movement({
        amount: Number.parseFloat(((Math.random() * 3000) * (Math.random() * 15)).toFixed(2)),
        concept: "Ordenado",
        date: new Date(2022, randomIntFromInterval(0,7) , randomIntFromInterval(0,31)),
        movementType: (Math.random() > 0.5 ? "INCOME" : "EXPENSE")
      })
      movements.push(newMovement)
    }
    return movements;
}

export default movementsService;
