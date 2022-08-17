import express from "express";
import users from "./controllers/users";
import cors from "cors";
import { config } from "dotenv";
config();
import "./mongo/connection";
import cookieParser from 'cookie-parser'
const app = express();
app.use(cookieParser())
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "http://localhost:8080"
}));

//Controllers
app.use("/users", users);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("app listening on port " + PORT);
});
