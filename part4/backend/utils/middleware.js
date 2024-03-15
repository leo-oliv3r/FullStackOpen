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

  return next(error);
}

export default { requestLogger, unknownEndpoint, errorHandler };
