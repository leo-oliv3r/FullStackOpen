import { beforeEach, describe, test, after } from "node:test";
import mongoose from "mongoose";
import assert from "node:assert";
import supertest from "supertest";
import app from "../app.js";
import Blog from "../models/blogModel.js";

const api = supertest(app);

const initialBlogsData = [
  { title: "Blog 1", author: "Author 1", url: "https://example.com/blog1", likes: 15 },
  { title: "Blog 2", author: "Author 2", url: "https://example.com/blog2", likes: 10 },
  { title: "Blog 3", author: "Author 3", url: "https://example.com/blog3", likes: 5 },
  {
    title: "Blog 4",
    author: "Author 4",
    url: "https://example.com/blog4",
    /* likes: 0 is default */
  },
  { title: "Blog 5", author: "Author 5", url: "https://example.com/blog5", likes: 1 },
];

const BLOGS_URI = "/api/blogs";

function assertBlogShape(blog) {
  assert(blog && typeof blog === "object");
  const expectedProperties = ["id", "author", "title", "url", "likes"];
  expectedProperties.forEach((prop) => assert(Object.prototype.hasOwnProperty.call(blog, prop)));
  assert.strictEqual(Object.prototype.hasOwnProperty.call(blog, "_id"), false);
  assert.strictEqual(Object.prototype.hasOwnProperty.call(blog, "__v"), false);
}

function generateValidMongooseId() {
  const id = new mongoose.Types.ObjectId();
  return id.toString();
}

beforeEach(async () => {
  await Blog.deleteMany({});
  const savePromises = initialBlogsData.map((blog) => new Blog(blog)).map((blog) => blog.save());
  await Promise.all(savePromises);
});

describe("GET", () => {
  describe("/api/blogs", () => {
    test("return all blogs", async () => {
      const response = await api.get(BLOGS_URI).expect(200);
      const fetchedBlogs = response.body;
      assert.strictEqual(fetchedBlogs.length, initialBlogsData.length);
    });

    test("return blogs with correct format and shape", async () => {
      const response = await api.get(BLOGS_URI).expect(200);
      const fetchedBlogs = response.body;
      fetchedBlogs.forEach((blog) => assertBlogShape(blog));
    });
  });

  describe("/api/blogs/:id", () => {
    test("return 200 and the note with the specified id if it exists", async () => {
      const firstBlogInDB = await Blog.findOne({});
      // @ts-ignore
      const { id } = firstBlogInDB;

      const response = await api
        .get(`${BLOGS_URI}/${id}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      const blogFound = response.body;

      assertBlogShape(blogFound);
    });
  });
});

describe("POST", () => {
  const validInput = {
    title: "Title",
    author: "Author",
    url: "url",
  };

  // Dont conform to blogSchema validation
  const invalidInput = {
    title: "ts",
    author: "as",
  };

  describe("/api/blogs", () => {
    test("given valid input, correctly create blog with 201 response", async () => {
      const initialBlogs = await Blog.find({});

      await api
        .post(BLOGS_URI)
        .send(validInput)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const updatedBlogs = await Blog.find({});

      assert(updatedBlogs.length === initialBlogs.length + 1);
    });

    test("correctly add default data if none provided", async () => {
      const response = await api
        .post(BLOGS_URI)
        .send(validInput)
        .expect(201)
        .expect("Content-Type", /application\/json/);
      const createdNote = response.body;
      assert(Object.prototype.hasOwnProperty.call(createdNote, "likes"));
    });

    test("correctly rejects given data that does not conform to schema", async () => {
      const response = await api.post(BLOGS_URI).send(invalidInput).expect(400);
      assert(response.body.error.includes("validation failed"));
    });
  });
});

describe("DELETE", () => {
  describe("api/blogs/:id", () => {
    test("given valid id, correctly delete blog", async () => {
      const blogsBeforeDelete = await Blog.find({});
      const validId = blogsBeforeDelete[0].id;

      await api.delete(`${BLOGS_URI}/${validId}`).expect(204);
      const blogsAfterDelete = await Blog.find({});

      assert(blogsAfterDelete.length === blogsBeforeDelete.length - 1);
    });

    test("given valid id, but no blog found, return 404", async () => {
      const randomValidId = generateValidMongooseId();
      await api.delete(`${BLOGS_URI}/${randomValidId}`).expect(404);
    });

    test("given invalid id return 400", async () => {
      const invalidId = "invalidId";
      await api.delete(`${BLOGS_URI}/${invalidId}`).expect(400);
    });
  });
});

describe("PUT", () => {
  describe("/api/blogs/:id", () => {
    test("given valid id, correctly update blog", async () => {
      const firstBlogInDB = await Blog.findOne({});
      const validId = firstBlogInDB?.id;

      const updatedData = {
        title: "Updated Blog",
        author: "Updated Author",
        url: "https://example.com/updated-blog",
      };

      const response = await api
        // @ts-ignore
        .put(`${BLOGS_URI}/${validId}`)
        .send(updatedData)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      assertBlogShape(response.body);
    });

    test("given valid id, but no blog found, return 404", async () => {
      const validId = generateValidMongooseId();
      const updatedData = {
        title: "Updated Blog",
        author: "Updated Author",
        url: "https://example.com/updated-blog",
      };

      await api.put(`${BLOGS_URI}/${validId}`).send(updatedData).expect(404);
    });

    test("given invalid id, return 400", async () => {
      const invalidId = "invalid-id";

      await api.put(`${BLOGS_URI}/${invalidId}`).send({}).expect(400);
    });
  });
});

after(() => mongoose.connection.close());
