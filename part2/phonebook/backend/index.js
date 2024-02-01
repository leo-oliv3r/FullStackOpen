import express from "express";
import morgan from "morgan";

morgan.token("type", (req, res) => {
    if (req.method === "POST") {
        return JSON.stringify(req.body);
    }
});

let phonebookData = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456",
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523",
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345",
    },
    {
        id: 4,
        name: "Mary Poppendieck",
        number: "39-23-6423122",
    },
];

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :type"));

app.get("/", (request, response) => {
    response.send(
        "/info for general info</br>/persons for whole notebook</br>/persons/id for get, post, delete"
    );
});

app.get("/api/persons", (request, response) => {
    response.json(phonebookData);
});

app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    const person = phonebookData.find((entry) => entry.id === id);

    if (person) {
        response.json(person);
    }

    response.status(404).end();
});

app.get("/info", (request, response) => {
    const nrOfPeople = phonebookData.length;
    const timeOfRequest = new Date();

    response.send(`<p>Phonebook has info for ${nrOfPeople} people</p>${timeOfRequest}`);
});

app.post("/api/persons", (request, response) => {
    const getHighestId = (list) => Math.max(...list.map((item) => item.id));
    const availableId = getHighestId(phonebookData) + 1;

    const { name, number } = request.body;

    const nameIsUsed = phonebookData.find((person) => person.name === name);
    const numberIsUsed = phonebookData.find((person) => person.number === number);

    if (nameIsUsed) return response.status(409).send({ error: "Names must be unique" });
    if (numberIsUsed) return response.status(409).send({ error: "Number must be unique" });

    const newContact = {
        id: availableId,
        name,
        number,
    };

    phonebookData = phonebookData.concat(newContact);
    return response.status(201).json(newContact);
});

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    const person = phonebookData.find((entry) => entry.id === id);

    if (person) {
        phonebookData = phonebookData.filter((entry) => entry.id !== id);
        response.status(204).end();
    }

    response.status(404).end();
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
