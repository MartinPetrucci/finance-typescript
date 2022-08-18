import express from "express";
import users from "./controllers/users";
import movements from './controllers/movements'
import cors from "cors";
import { config } from "dotenv";
config();
import "./mongo/connection";
import cookieParser from 'cookie-parser'
import auth from "./middlewares/auth";
const app = express();
app.use(cookieParser())
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "http://localhost:8080"
}));

//Controllers
app.use("/users", users);
app.use("/movements", auth, movements)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("app listening on port " + PORT);
});
