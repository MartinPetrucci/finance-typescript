import { Types } from "mongoose";
import { oId, totalBalance } from "../helpers";
import { IMovement, Movement, movementSchema } from "../models/Movement";
import { User } from "../models/User";
import { getYearMonth } from "./monthsService";
const movementsService = {
  getTotalBalance: async (userId: string) => {
    const user = await User.findOne({ _id: userId });
    if (user) {
      const months = user.months;
      return totalBalance(months);
    }
  },
  getMonths: async (userId: string) => {
    const user = await User.findOne({ _id: oId(userId) });
    const months = user?.months;
    return months;
  },
  addMovement: async (userId: string, movement: IMovement) => {
    const newMovement = new Movement(movement);
    console.log({ newMovement });

    const { amount, date, movementType } = newMovement;
    const movementDate = getYearMonth(date || new Date());
    try {
      const user = await User.findOne({ _id: (userId) });
      const month = user?.months?.find((month) => month.date == movementDate);
      if (month) {
        if (movementType === "INCOME") {
          month.incomes.movements.push(newMovement);
          month.incomes.movements.sort((a, b) => sortByDate(a, b));
          month.incomes.total += amount || 0;
        } else {
          month.expenses.movements.push(newMovement);
          month.expenses.movements.sort((a, b) => sortByDate(a, b));
          month.expenses.total += amount || 0;
        }
      }
      await user?.save();
    } catch (error) {
      console.log('ERROR->', error)
    }
  },
};

const sortByDate = (a: IMovement, b: IMovement) => {
  if (a.date > b.date) return 1;
  if (a.date < b.date) return -1;
  return 0;
};

const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const createMovements = (amount: number) => {
  let movements = [];
  for (let i = 0; i < amount; i++) {
    const newMovement = new Movement({
      amount: Number.parseFloat(
        (Math.random() * 3000 * (Math.random() * 15)).toFixed(2)
      ),
      concept: "Ordenado",
      date: new Date(
        2022,
        randomIntFromInterval(0, 7),
        randomIntFromInterval(0, 31)
      ),
      movementType: Math.random() > 0.5 ? "INCOME" : "EXPENSE",
    });
    movements.push(newMovement);
  }
  return movements;
};

export default movementsService;
