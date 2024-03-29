import express from "express";
import Blog from "../models/Blog.js";

const blogRouter = express.Router();

blogRouter.get("/:id", async (request, response, next) => {
  try {
    const noteFound = await Blog.findById(request.params.id);
    return noteFound ? response.json(noteFound) : response.status(404).end();
  } catch (error) {
    return next(error);
  }
});

blogRouter.get("/", async (_, response, next) => {
  try {
    const blogsFound = await Blog.find({});
    return response.json(blogsFound);
  } catch (error) {
    return next(error);
  }
});

blogRouter.post("/", async (request, response, next) => {
  const blogData = new Blog(request.body);
  try {
    const saveResponse = await blogData.save();
    response.status(201).json(saveResponse);
  } catch (error) {
    next(error);
  }
});

blogRouter.delete("/:id", async (request, response, next) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(request.params.id);
    if (!deletedBlog) {
      return response.status(404).end();
    }
    return response.status(204).end();
  } catch (error) {
    return next(error);
  }
});

blogRouter.put("/:id", async (request, response, next) => {
  const updatedData = request.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, updatedData, { new: true });

    if (!updatedBlog) {
      return response.status(404).end();
    }

    return response.json(updatedBlog);
  } catch (error) {
    return next(error);
  }
});

export default blogRouter;
