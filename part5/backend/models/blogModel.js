import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 3,
    required: true,
  },
  author: {
    type: String,
    minlength: 3,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

blogSchema.set("toJSON", {
  transform: (_, returnedObject) => {
    const copy = { ...returnedObject };
    copy.id = copy._id.toString();
    delete copy._id;
    delete copy.__v;
    return copy;
  },
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
