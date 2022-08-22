import { Types } from "mongoose";
import { IMonth } from "../models/Month";
import { Month } from "../test";

export const oId = (id: string) => {
  return new Types.ObjectId(id);
};

export const totalBalance = (months: Types.DocumentArray<IMonth>) => {
  let totalIncomes = 0;
  let totalExpenses = 0;

  months.forEach((month) => {
    totalIncomes += month.incomes.total;
    totalExpenses += month.expenses.total;
  });
  const balance = totalIncomes - totalExpenses;
  
  return {balance, totalIncomes, totalExpenses}
};

