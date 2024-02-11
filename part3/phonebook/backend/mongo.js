import mongoose from "mongoose";

const argc = process.argv.length;

if (argc !== 5) {
    console.log("Usage: node mongo.js <password> <ContactName> <ContactNumber>");
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://leonardovic3nte:${password}@cluster0.zgevewk.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Contact = new mongoose.model("Contact", contactSchema);


