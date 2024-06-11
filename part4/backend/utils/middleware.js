import jwt from "jsonwebtoken";
import logger from "./logger.js";
import User from "../models/userModel.js";

function requestLogger(request, _, next) {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
}

function tokenExtractor(request, _, next) {
  const authHeader = request.get("authorization");

  if (!authHeader || !authHeader.toLowerCase().startsWith("bearer ")) {
    next();
    return;
  }

  const token = authHeader.substring(7);

  try {
    // @ts-ignore
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken.id) {
      throw new Error("invalid token");
    }
  } catch (error) {
    next(error);
    return;
  }

  // Extracts jwt token from header
  request.token = token;
  next();
}

async function userExtractor(request, _, next) {
  const { token } = request;

  if (!token) {
    next();
    return;
  }

  let tokenPayload = null;
  try {
    // @ts-ignore
    tokenPayload = jwt.verify(request.token, process.env.JWT_SECRET);
  } catch (error) {
    next(error);
    return;
  }

  // @ts-ignore
  const userFound = await User.findById(tokenPayload.id);

  if (!userFound) {
    next(new Error("no user found for provided token"));
  }

  request.user = userFound;
  next();
}

function unknownEndpoint(_, response) {
  response.status(404).send({ error: "unknown endpoint" });
}

function errorHandler(error, _, response, next) {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "invalid id provided" });
  }
  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: error.message });
  }

  if (error.message.includes("username and password must be provided")) {
    return response.status(400).json({ error: error.message });
  }

  if (error.message.includes("password must be at least 3 chars long")) {
    return response.status(400).json({ error: error.message });
  }

  if (error.message.includes("no user found for provided token")) {
    return response.status(404).json({ error: error.message });
  }

  if (error.name === "MongoServerError" && error.message.includes("E11000 duplicate key error")) {
    return response.status(400).json({ error: "expected `username` to be unique" });
  }

  if (error.name === "TokenExpiredError") {
    return response.status(401).json({ error: "token expired" });
  }

  if (error.message.includes("token missing")) {
    return response.status(401).json({ error: "token missing" });
  }

  if (error.message.includes("invalid token")) {
    return response.status(401).json({ error: "invalid token" });
  }

  return next(error);
}

export default { requestLogger, unknownEndpoint, errorHandler, tokenExtractor, userExtractor };
