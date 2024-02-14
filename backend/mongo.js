import mongoose from "mongoose";

if (process.argv.length < 3) {
	console.log("give password as argument");
	process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://leonardovic3nte:${password}@fso-training.ntzlyjv.mongodb.net/noteApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
	content: String,
	important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

const notesFound = await Note.find({});
notesFound.forEach((note) => console.log(note));
mongoose.connection.close().then(() => process.exit());
