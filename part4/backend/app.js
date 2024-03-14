import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./utils/config.js";
import blogRouter from "./controllers/blogController.js";
import logger from "./utils/logger.js";

const app = express();

if (!config.MONGODB_URI) throw new Error("No database URI provided");

try {
  logger.info("connecting to database...");
  await mongoose.connect(config.MONGODB_URI);
  logger.info("successfully connected to database");
} catch (error) {
  logger.error(error.message);
}

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogRouter);

export default app;
