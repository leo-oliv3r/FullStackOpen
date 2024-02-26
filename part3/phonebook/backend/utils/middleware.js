import logger from "./logger.js";

function unknownEndpoint(request, response) {
  response.status(404).send({ error: "unknown endpoint" });
}

function errorHandler(error, request, response, next) {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "invalid id format" });
  }

  if (error.name === "NotFound") {
    return response.status(404).send({ error: "contact not found" });
  }

  if (error.message === "BadInput") {
    return response.status(400).send({ error: "data missing or invalid" });
  }

  if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message });
  }

  return next(error);
}

export default { unknownEndpoint, errorHandler };
