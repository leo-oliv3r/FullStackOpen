import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const loginRouter = express.Router();

loginRouter.post("/", async (request, response, next) => {
  const { username, password } = request.body;

  if (!username || !password) {
    next(new Error("username and password must be provided"));
    return;
  }

  const user = await User.findOne({ username });

  const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!user || !passwordCorrect) {
    response.status(401).json({
      error: "invalid username or password",
    });
    return;
  }

  const dataForToken = {
    username: user.username,
    id: user._id,
  };

  // @ts-ignore
  const token = jwt.sign(dataForToken, process.env.JWT_SECRET);

  response.status(200).send({ token, username: user.username, name: user.name });
});

export default loginRouter;
