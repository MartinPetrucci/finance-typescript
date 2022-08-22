import { Router } from "express";
import { IMovement } from "../models/Movement";
import movementsService from "../services/movementsService";
const router = Router();

router
  .route("/")
  .get(async (req, res) => {
    const id = res.locals.id;
    const months = await movementsService.getMonths(id);
    console.log({ months });
    res.status(200).send(months);
  })
  .post(async (req, res) => {
    const id = res.locals.id;
    const {amount, concept, date, movementType} = req.body
    const movement: IMovement = {
      amount,
      concept,
      date: new Date(date),
      movementType
    };
    await movementsService.addMovement(id, movement);
    res.status(201).end();
  });

router.route("/balance").get(async (req, res) => {
  console.log("balance");
  const id = res.locals.id;
  const totalBalance = await movementsService.getTotalBalance(id);
  res.status(200).send(totalBalance);
});

export default router;
