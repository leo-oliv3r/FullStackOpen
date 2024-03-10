import { describe, test } from "node:test";
import assert from "node:assert";
import {
  dummy,
  getAuthorWithMostBlogs,
  getFavoriteBlog,
  getSumOfLikes,
} from "./blogListHelper.js";

test("dummy returns one", () => {
  const blogs = [];

  const result = dummy(blogs);
  assert.strictEqual(result, 1);
});

const emptyBlogsList = [];

const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
    likes: 5,
    __v: 0,
  },
];

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

describe("getSumOfLikes", () => {
  test("return 0 with no blogs given", () => {
    assert.strictEqual(getSumOfLikes(emptyBlogsList), 0);
  });

  test("return correct number of likes likes for one blog", () => {
    assert.strictEqual(getSumOfLikes(listWithOneBlog), 5);
  });

  test("return correct number of likes likes many blogs", () => {
    assert.strictEqual(getSumOfLikes(blogs), 36);
  });
});

describe("getFavoriteBlog", () => {
  test("return null with no blogs given", () => {
    assert.strictEqual(getFavoriteBlog(emptyBlogsList), null);
  });

  test("correctly return formatted data for one blog list", () => {
    const expected = {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5,
    };

    assert.deepStrictEqual(getFavoriteBlog(listWithOneBlog), expected);
  });

  test("correctly return formatted data for many blogs list", () => {
    const expected = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    };

    assert.deepStrictEqual(getFavoriteBlog(blogs), expected);
  });
});

describe("getAuthorWithMostBlogs", () => {
  test("return null with empty blogs list", () => {
    assert.strictEqual(getAuthorWithMostBlogs(emptyBlogsList), null);
  });

  test("return correct author with one blog", () => {
    const expected = {
      name: "Edsger W. Dijkstra",
      nrBlogs: 1,
    };
    assert.deepStrictEqual(getAuthorWithMostBlogs(listWithOneBlog), expected);
  });

  test("return correct author with multiple blogs", () => {
    const expected = {
      name: "Robert C. Martin",
      nrBlogs: 3,
    };
    assert.deepStrictEqual(getAuthorWithMostBlogs(blogs), expected);
  });
});
