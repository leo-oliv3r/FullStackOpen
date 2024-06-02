import logger from "./logger.js";

function requestLogger(request, _, next) {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
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

  if (error.message.includes("username and password must be provided")) {
    return response.status(400).json({ error: error.message });
  }

  if (error.name === "MongoServerError" && error.message.includes("E11000 duplicate key error")) {
    return response.status(400).json({ error: "expected `username` to be unique" });
  }

  return next(error);
}

export default { requestLogger, unknownEndpoint, errorHandler };
