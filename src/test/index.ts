import movementsService, { createMovements } from "../services/movementsService";

export interface MovementsResponse {
  months: Month[];
}

export interface Month {
  date: string;
  incomes: {
    total: number;
    movements: any[]
  }
  expenses: {
    total: number;
    movements: any[]
  }
}

export interface Movement {
  id: string;
  movementType: string;
  amount: number | null;
  date: string;
  concept: string;
}

enum movementType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}
const movs = createMovements(100);
const movements = movs.map((mov) => {
  return mov.toJSON();
});


const addManyMovements = async (amount: number) => {
  const movements = createMovements(amount)
  movements.forEach(async (movement) => {
    console.log({movement})
    await movementsService.addMovement("62ffe233d82056d8537bb991", movement)
  })  
}

addManyMovements(2)


// let months: Month[] = [];

// for (let i = 1; i < 9; i++) {
//   const month = {
//     date: `2022-`,
//     incomes: [],
//     expenses: [],
//   };
// }

// const desde = new Date(2022, 0);
// const hasta = new Date();
// // console.log(desde,hasta)
// const createMonths = (since: { year: number; month: number }, until: Date) => {
//   let { year, month } = since;
//   let indexDate = new Date(year, month);

//   while (indexDate < until) {
//     const newMonth = {
//       date: indexDate.toISOString().split("T")[0].substring(0, 7),
//       incomes: {
//         total: 0,
//         movements: []
//       },
//       expenses: {
//         total: 0,
//         movements: []
//       },
//     };
//     months.push(newMonth);
//     month++;
//     indexDate = new Date(year, month);
//   }
// };
// createMonths({ year: 2022, month: 0 }, hasta);
// console.log(months);

// movements.forEach((movement) => {
//   const { date } = movement;
//   const movementDate = date?.toString().substring(0, 7);
//   const month = months.find((month) => month.date === movementDate);
//   if (month) {
//     if (movement.movementType == "INCOME") {
//       month.incomes.movements.push(movement);
//       month.incomes.total += movement.amount || 0
//     } else {
//       month.expenses.movements.push(movement);
//       month.expenses.total += movement.amount || 0
//     }
//     //   } else {
//     //     const newMonth: any = {
//     //       date: movementDate,
//     //       incomes: [],
//     //       expenses: []
//     //     };
//     //     if (movement.movementType == "INCOME") {
//     //         newMonth?.incomes.push(movement);
//     //       } else {
//     //         newMonth?.expenses.push(movement);
//     //       }
//     //     months.push(newMonth)
//   }
// });

