import "dotenv/config";
import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;


try {
	console.log(`Connecting...`);
	await mongoose.connect(url);
	console.log("Successfully connected to mongo database");
} catch (error) {
	console.log(`Error connecting to MongoDB, ${error.message}`);
}

const noteSchema = new mongoose.Schema({
	content: String,
	important: Boolean,
});

noteSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		const newObj = {
			...returnedObject,
			id: returnedObject._id.toString(),
		};
		delete newObj._id;
		delete newObj.__v;
		return newObj;
	},
});

const Note = mongoose.model("Note", noteSchema);

export default Note;
