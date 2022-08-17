import jwt, { decode } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface UserIDJwtPayload extends jwt.JwtPayload {
  id: string;
}

const auth = (req: Request, res: Response, next: NextFunction) => {
  const { jwt: token } = req.cookies;
  try {
    const {id} = <UserIDJwtPayload>jwt.verify(token, process.env.SECRET || "");
    res.locals.id = id;
    next();
  } catch (error) {
    console.log({ error });
    res.status(403).send("Token missing or invalid");
  }
};

export default auth;
