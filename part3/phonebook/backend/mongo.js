import mongoose from "mongoose";

const argc = process.argv.length;

if (argc !== 3 && argc !== 5) {
	console.log("Usage: node mongo.js <password> <ContactName>? <ContactNumber>?");
	process.exit(1);
}

const noNewContactDataProvided = argc === 3 ? true : false;

const cliArgs = {};
// password property used in both 3 and 5 argc cases
cliArgs.password = process.argv[2];
const url = `mongodb+srv://leonardovic3nte:${cliArgs.password}@cluster0.zgevewk.mongodb.net/?retryWrites=true&w=majority`;
try {
	mongoose.set("strictQuery", false);
	await mongoose.connect(url);
} catch (error) {
	console.error(error.message);
	process.exit(2);
}

if (argc === 5) {
	cliArgs.contactName = process.argv[3];
	cliArgs.contactNumber = process.argv[4];
}

const contactSchema = new mongoose.Schema({
	name: String,
	number: String,
});

const Contact = mongoose.model("Contact", contactSchema);

if (noNewContactDataProvided) {
	console.log("No Contact data provided, fetching all contacts...");
	const allContactsFound = await Contact.find({});
	allContactsFound.forEach((contact) => console.log(contact));

	await mongoose.connection.close();
	process.exit();
}

const newContact = new Contact({
	name: cliArgs.contactName,
	number: cliArgs.contactNumber,
});

try {
	await newContact.save();
	console.log(`Added ${cliArgs.contactName} number ${cliArgs.contactNumber} to phonebook`);
} catch (error) {
	console.error(error);
	process.exit(3);
}

await mongoose.connection.close();
process.exit();
