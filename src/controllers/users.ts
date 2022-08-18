import { Router } from "express";
import auth from "../middlewares/auth";
import userService from "../services/userService";

const router = Router();

router.route("/hello").get(auth ,async (req, res) => {
  console.log('hello locals',res.locals.id)
  res.send("hello endpoint users");
});

router.route("/register").post(async (req, res) => {
  const { body: userRegister } = req;
  try {
    const registeredUser = await userService.registerUser(userRegister);
    res.status(201).send(registeredUser);
  } catch (err: any) {
    res.status(400).send(err.message);
  }
});

router.route("/login").post(async (req, res) => {
  const { username, password } = req.body;
  try {
    const {token, returnedUser} = await userService.login(username, password);
    res
      .status(200)
      .cookie("jwt", token, {
        sameSite: "lax",
        path: "/",
        expires: new Date(new Date().getTime() + 3600 * 1000),
        httpOnly: true,
        secure: true,
      })
      .send(returnedUser);
  } catch (err: any) {
    res.status(400).send(err.message);
  }
});

router.route("/logout").get(async (req, res) => {
  res.status(200).clearCookie('jwt').end()
})



export default router;
