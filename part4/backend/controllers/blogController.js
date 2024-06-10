// @ts-nocheck
import express from "express";
import jwt from "jsonwebtoken";
import Blog from "../models/blogModel.js";
import User from "../models/userModel.js";

function isTokenValid(decodedToken) {
  if (!decodedToken.id) {
    return false;
  }

  return true;
}

const blogRouter = express.Router();

blogRouter.get("/:id", async (request, response, next) => {
  try {
    const noteFound = await Blog.findById(request.params.id).populate("user");
    return noteFound ? response.json(noteFound) : response.status(404).end();
  } catch (error) {
    return next(error);
  }
});

blogRouter.get("/", async (_, response, next) => {
  try {
    const blogsFound = await Blog.find({}).populate("user", { username: 1, name: 1 });
    return response.json(blogsFound);
  } catch (error) {
    return next(error);
  }
});

blogRouter.post("/", async (request, response, next) => {
  if (!request.token) {
    response.status(401).json({ error: "token missing or invalid" });
    return;
  }

  // @ts-ignore
  const decodedToken = jwt.verify(request.token, process.env.JWT_SECRET);

  if (!isTokenValid(decodedToken)) {
    response.status(401).json({ error: "invalid token" });
    return;
  }

  const { title, author, url } = request.body;
  const validUser = await User.findById(decodedToken.id);

  if (!validUser) {
    response.status(404).json({ error: "no user found for provided token" });
    return;
  }
  const newBlog = new Blog({ title, author, url, user: validUser._id });

  try {
    const saveResponse = await newBlog.save();
    validUser.blogs = validUser.blogs.concat(saveResponse._id);
    await validUser.save();
    response.status(201).json(saveResponse);
  } catch (error) {
    next(error);
  }
});

blogRouter.delete("/:id", async (request, response, next) => {
  if (!request.token) {
    response.status(401).json({ error: "token missing or invalid" });
    return;
  }

  const decodedToken = jwt.verify(request.token, process.env.JWT_SECRET);

  if (!isTokenValid(decodedToken)) {
    response.status(401).json({ error: "invalid token" });
    return;
  }

  try {
    const userFromToken = await User.findById(decodedToken.id);
    if (!userFromToken) {
      response.status(404).json({ error: "no user found for provided token" });
      return;
    }

    const blogFound = await Blog.findById(request.params.id);
    if (!blogFound) {
      response.status(404).end();
      return;
    }

    if (blogFound.user.toString() !== userFromToken._id.toString()) {
      response.status(401).json({ error: "unauthorized to delete this blog" });
      return;
    }

    await Blog.findByIdAndDelete(request.params.id);
    userFromToken.blogs = userFromToken.blogs.filter(
      (blog) => blog._id.toString() !== request.params.id
    );
    await userFromToken.save()
    response.status(204).end();
  } catch (error) {
    next(error);
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
