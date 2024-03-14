import express from "express";
import Blog from "../models/Blog.js";

const blogRouter = express.Router();

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

export default blogRouter;
