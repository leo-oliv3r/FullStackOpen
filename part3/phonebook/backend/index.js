import express from "express";
import morgan from "morgan";
import Contact from "./models/contact.js";


// @todo Once integration with frontend is done, deploy to fly.io

const app = express();

app.use(express.json());
app.use(morgan("tiny"));

app.get("/api/persons", async (request, response) => {
  const foundContacts = await Contact.find({});
  console.log(foundContacts);
  return response.json(foundContacts);
});

app.get("/api/persons/:id", async (request, response) => {
  const person = await Contact.findById(request.params.id);

  if (person) {
    return response.json(person);
  }

  return response.status(404).send({
    error: "No contact with provided id found",
  });
});

app.get("/", async (request, response) => {
  const nrOfPeople = (await Contact.find({})).length;
  const timeOfRequest = new Date();

  return response.send(`<p>Phonebook has info of ${nrOfPeople} people</p>${timeOfRequest}`);
});

app.post("/api/persons", async (request, response) => {
  const { name, number } = request.body;

  const newContact = new Contact({
    name,
    number,
  });

  const returnedData = await newContact.save();
  return response.status(201).json(returnedData);
});

app.delete("/api/persons/:id", async (request, response) => {
  const person = await Contact.findById(request.params.id);

  if (person) {
    await person.deleteOne({ _id: request.params.id });
    return response.status(204).end();
  }

  return response.status(404).json({ error: "No contact with provided id found" });
});

function unknownEndpoint(request, response) {
  response.status(404).send({ error: "unknown endpoint" });
}
app.use(unknownEndpoint);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
