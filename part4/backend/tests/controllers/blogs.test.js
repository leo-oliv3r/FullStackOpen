import { describe, test, beforeEach } from "node:test";
import assert from "node:assert";
import supertest from "supertest";
import app from "../../app.js";
import Blog from "../../models/blog.js";

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogs = [
    { title: "Blog 1", author: "Author 1", url: "https://example.com/blog1" },
    { title: "Blog 2", author: "Author 2", url: "https://example.com/blog2" },
  ];
  await Blog.insertMany(blogs);
});

describe("GET /blogs", () => {
  test("should return all blogs", async () => {
    const response = await api.get("/blogs").expect(200);
    assert.strictEqual(response.body.length, 2);
    assert.strictEqual(response.body[0].title, "Blog 1");
    assert.strictEqual(response.body[1].title, "Blog 2");
  });
});
