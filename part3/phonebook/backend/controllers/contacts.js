import express from "express";
import Contact from "../models/contact.js";
import NotFoundError from "../utils/errors.js";

const contactRouter = express.Router();

function validateInput(name, number) {
  if (!name || !number) throw new Error("BadInput");
}

contactRouter.get("/", async (request, response, next) => {
  try {
    const foundContacts = await Contact.find({});
    return response.json(foundContacts);
  } catch (error) {
    return next(error);
  }
});

contactRouter.get("/info", async (request, response) => {
  const nrOfPeople = (await Contact.find({})).length;
  const timeOfRequest = new Date();

  return response.send(`<p>Phonebook has info of ${nrOfPeople} people</p>${timeOfRequest}`);
});

contactRouter.get("/:id", async (request, response, next) => {
  const { id } = request.params;

  try {
    const personFound = await Contact.findById(id);

    if (!personFound) throw new NotFoundError();

    return response.json(personFound);
  } catch (error) {
    return next(error);
  }
});

contactRouter.post("/", async (request, response, next) => {
  const { name, number } = request.body;

  try {
    validateInput(name, number);

    const newContact = new Contact({
      name,
      number,
    });

    const returnedData = await newContact.save().catch(next);
    return response.status(201).json(returnedData);
  } catch (error) {
    return next(error);
  }
});

contactRouter.put("/:id", async (request, response, next) => {
  const { id } = request.params;
  const { name, number } = request.body;

  try {
    validateInput(name, number);

    const updatedData = {
      name,
      number,
    };

    const updatedContact = await Contact.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
      context: "query",
    });
    if (!updatedContact) throw new NotFoundError();

    return response.json(updatedContact);
  } catch (error) {
    return next(error);
  }
});

contactRouter.delete("/:id", async (request, response, next) => {
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

export default contactRouter;
