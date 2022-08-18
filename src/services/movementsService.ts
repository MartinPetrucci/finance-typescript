import { Movement } from "../models/Movement";
import { User } from "../models/User";

const movementsService = {
  getTotalBalance: async (userId: string) => {
    const user = await User.findOne({ id: userId });
    console.log({ user });
    const movements = user?.toJSON().movements;
    console.log({ movements });
  },
  getMovements: async (userId: string) => {
    const user = await User.findOne({ id: userId });
    const movements = user?.toJSON().movements;
    return movements;
  },
  addMovement: async (userId: string) => {
    const newMovement = new Movement({
      amount: 35000,
      concept: "Celular",
      date: new Date(),
      movementType: "EXPENSE",
    });

    try {
      const response = await User.findOneAndUpdate(
        { id: userId },
        {
          $push: {
            movements: {
                $each: [newMovement],
                $sort: {date: -1} //Revisar si podemos pushearlo en orden
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

export default movementsService;
