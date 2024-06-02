import express from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";

const usersRouter = express.Router();

usersRouter.post("/", async (request, response, next) => {
  const { username, password } = request.body;

  if (!username || !password) {
    next(new Error("username and password must be provided"));
  }

  let { name } = request.body;
  if (!name) name = "Anonymous";

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newUser = new User({
    username,
    name,
    passwordHash,
  });

  try {
    const savedUser = await newUser.save();
    response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
