import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const loginRouter = express.Router();

// @todo implement code to pass the test
