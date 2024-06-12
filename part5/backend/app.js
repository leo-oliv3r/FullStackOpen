import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./utils/config.js";
import blogRouter from "./controllers/blogController.js";
import usersRouter from "./controllers/userController.js";
import logger from "./utils/logger.js";
import middleware from "./utils/middleware.js";
import loginRouter from "./controllers/loginController.js";

const app = express();

if (!config.MONGODB_URI) throw new Error("No database URI provided");

try {
  logger.info("connecting to database...");
  await mongoose.connect(config.MONGODB_URI);
  logger.info("successfully connected to database");
} catch (error) {
  logger.error(error.message);
}

app.use(middleware.tokenExtractor);
app.use(cors());
app.use(express.json());

app.use("/api/blogs", middleware.userExtractor, blogRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.get("/", (_, res) => {
  res.json({ blogs: "/api/blogs" });
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
