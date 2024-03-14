import { beforeEach, describe, test, after } from "node:test";
import mongoose from "mongoose";
import assert from "node:assert";
import supertest from "supertest";
import app from "../app.js";
import Blog from "../models/Blog.js";

const api = supertest(app);

const initialBlogsData = [
  { title: "Blog 1", author: "Author 1", url: "https://example.com/blog1" },
  { title: "Blog 2", author: "Author 2", url: "https://example.com/blog2" },
  { title: "Blog 3", author: "Author 3", url: "https://example.com/blog3" },
  { title: "Blog 4", author: "Author 4", url: "https://example.com/blog4" },
  { title: "Blog 5", author: "Author 5", url: "https://example.com/blog5" },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  const savePromises = initialBlogsData.map((blog) => new Blog(blog)).map((blog) => blog.save());
  await Promise.all(savePromises);
});

describe("GET", () => {
  describe("/blogs", () => {
    test("should return all blogs", async () => {
      const response = await api.get("/api/blogs").expect(200);
      const { body } = response;
      assert.strictEqual(body.length, initialBlogsData.length);
    });
  });
});

// @todo write rest of test and implementations

after(async () => mongoose.connection.close());
