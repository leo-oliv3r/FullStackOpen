import express from "express";
import morgan from "morgan";
import Contact from "./models/contact.js";
import NotFoundError from "./errors/errors.js";

// @todo Once integration with frontend is done, deploy to fly.io

const app = express();

app.use(express.json());
app.use(morgan("tiny"));

app.get("/", async (request, response) => {
  const nrOfPeople = (await Contact.find({})).length;
  const timeOfRequest = new Date();

  return response.send(`<p>Phonebook has info of ${nrOfPeople} people</p>${timeOfRequest}`);
});

app.get("/api/persons", async (request, response) => {
  const foundContacts = await Contact.find({});
  return response.json(foundContacts);
});

app.get("/api/persons/:id", async (request, response, next) => {
  const { id } = request.params;

  try {
    const personFound = await Contact.findById(id);

    if (!personFound) throw new NotFoundError();

    return response.json(personFound);
  } catch (error) {
    return next(error);
  }
});

app.post("/api/persons", async (request, response, next) => {
  const { name, number } = request.body;

  const newContact = new Contact({
    name,
    number,
  });

  const returnedData = await newContact.save().catch(next);
  return response.status(201).json(returnedData);
});

app.put("/api/persons/:id", async (request, response, next) => {
  const { id } = request.params;
  const { name, number } = request.body;

  try {
    if (!name || !number) throw new Error("BadInput");

    const updatedData = {
      name,
      number,
    };

    const updatedContact = await Contact.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedContact) throw new NotFoundError();
    return response.json(updatedContact);
  } catch (error) {
    return next(error);
  }
});

app.delete("/api/persons/:id", async (request, response, next) => {
  const { id } = request.params;

  try {
    const queryResponse = await Contact.findByIdAndDelete(id);

    if (queryResponse.deletedCount === 0) {
      throw new NotFoundError();
    }

    return response.status(204).end();
  } catch (error) {
    return next(error);
  }
});

function unknownEndpoint(request, response) {
  response.status(404).send({ error: "unknown endpoint" });
}
app.use(unknownEndpoint);

function errorHandler(error, request, response, next) {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "invalid id format" });
  }

  if (error.name === "NotFound") {
    return response.status(404).send({ error: "contact not found" });
  }

  if (error.message === "BadInput") {
    return response.status(400).send({ error: "data missing or invalid" });
  }

  return next(error);
}
app.use(errorHandler);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
