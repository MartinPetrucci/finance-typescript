import { User } from "../models/User";
import { hash, genSalt, compare } from "bcrypt";
import jwt from "jsonwebtoken";
interface UserRegister {
  fullname: string;
  username: string;
  password: string;
}

const userService = {
  registerUser: async (userRegister: UserRegister) => {
    const user = await User.findOne({ username: userRegister.username });
    if (user) throw new Error("User already exists");

    const salt = await genSalt(10);
    const passwordHash = await hash(userRegister.password, salt);
    const newUser = new User({
      fullname: userRegister.fullname,
      username: userRegister.username,
      passwordHash,
    });
    const registeredUser = await newUser.save();
    return registeredUser;
  },
  login: async (username: string, password: string) => {
    const user = await User.findOne({ username: username });

    const correct =
      user != null && (await compare(password, user.passwordHash));

    if (!correct) throw new Error("Username or password incorrect");

    const objectToEncrypt = {
      id: user.id,
    };
    const token = jwt.sign(objectToEncrypt, process.env.SECRET || "");
    const returnedUser = {
      fullname: user.fullname,
      username: user.username
    }
    return {token, returnedUser};
  },
};

export default userService;
