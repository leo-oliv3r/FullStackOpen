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

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
});

contactSchema.set("toJSON", {
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

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
