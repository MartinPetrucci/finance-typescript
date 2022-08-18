import { Router } from "express";
import movementsService from "../services/movementsService";
const router = Router();

router.route("/").get(async (req, res) => {
    const id = res.locals.id
    const movements = await movementsService.getMovements(id)
    console.log({movements})
    res.status(200).send(movements)
}).post(async (req, res) => {
    const id = res.locals.id
    await movementsService.addMovement(id)
    res.status(201).end()
})



router.route("/balance").get(async (req, res) => {
  console.log("balance");
  const data = {
    balance: 3475,
    incomes: 7000,
    expenses: 2000,
  };
//   const id = res.locals.id
//   movementsService.getTotalBalance(id)
  res.status(200).send(data);
});

export default router