// import { connect, closeDatabase } from "./db";
import mongoose from "mongoose";
import { oId } from "../helpers";
import { User } from "../models/User";
import movementsService from "../services/movementsService";
import userService from "../services/userService";
const connectionString =
  "mongodb+srv://martinpetrucci:martin00@cluster0.les2c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const createTestingUser = async () => {
  const testingUser = {
    fullname: "Jest Testing",
    username: "jest",
    password: "12345",
  };
  await userService.registerUser(testingUser);
};

const deleteTestingUser = async () => {
  await User.deleteOne({ username: "jest" });
};

beforeAll(async () => {
  console.log({ connectionString });
  try {
    await mongoose.connect(connectionString);
    console.log("connected");
  } catch (error) {
    console.log("error", error);
  }
});

// beforeEach(async () => {
//   await createTestingUser();
// });

// afterEach(async () => {
//     await deleteTestingUser();
// })

afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
});

describe("Primer grupo de test", () => {
  test("10 + 10 = 20", () => {
    expect(10 + 10).toBe(20);
  });

  test("Obteniendo un usuario y validando longitud de months", async () => {
    const userId = "62ffe233d82056d8537bb991"
    const newMovement = {
        amount: 2000,
        movementType: "INCOME",
        date: new Date(),
        concept: "Prueba desde JEST"
    }

    await movementsService.addMovement(userId, newMovement)

    const user = await User.findOne({ _id: oId(userId) });
    const movement = user?.months[0].incomes.movements[0]

    expect(movement?.concept).toBe("Prueba desde JESTs")
  });
});
