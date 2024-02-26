// eslint-disable-next-line import/no-extraneous-dependencies
import cors from "cors";
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import contactRouter from "./controllers/contacts.js";
import logger from "./utils/logger.js";
import config from "./utils/config.js";
import middleware from "./utils/middleware.js";

mongoose.set("strictQuery", false);

try {
  logger.info(`Connecting...`);
  await mongoose.connect(config.MONGODB_URI);
  logger.info("Successfully connected to mongo database");
} catch (error) {
  logger.error(`Error connecting to MongoDB, ${error.message}`);
}

const app = express();

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(morgan("tiny"));

app.use("/api/persons", contactRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
