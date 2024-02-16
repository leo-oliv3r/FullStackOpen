import express from "express";
import cors from "cors";
import Note from "./models/note.js";

const app = express();

function requestLogger(request, response, next) {
	console.log("Method:", request.method);
	console.log("Path:  ", request.path);
	console.log("Body:  ", request.body);
	console.log("---");
	next();
}

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(express.static("build"));

app.get("/", (req, res) => {
	res.send("<h1>Hello! /api/notes endpoint for notes api usage</h1>");
});

app.get("/api/notes", async (req, res) => {
	const notesFound = await Note.find({});
	res.json(notesFound);
});

app.post("/api/notes", async (request, response) => {
	const noteData = request.body;

	if (!noteData.content) {
		return response.status(400).json({
			error: "content missing",
		});
	}

	const note = new Note({
		content: noteData.content,
		important: noteData.important || false,
	});

	return response.status(201).json(await note.save());
});

app.get("/api/notes/:id", async (request, response) => {
	const note = await Note.findById(request.params.id);

	if (note) {
		response.json(note);
	} else {
		response.status(404).end();
	}
});

// app.delete("/api/notes/:id", (request, response) => {
// 	const id = Number(request.params.id);
// 	notes = notes.filter((note) => note.id !== id);

// 	response.status(204).end();
// });

function unknownEndpoint(request, response) {
	response.status(404).send({ error: "unknown endpoint" });
}
app.use(unknownEndpoint);

const { PORT } = process.env;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
