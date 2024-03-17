import assert from "node:assert";
import { describe, test } from "node:test";
import { getAuthorWithMostBlogs, getFavoriteBlog, getSumOfLikes } from "./blogListHelper.js";

const blogsTestData = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  },
];

function getRandomBlog(blogsArray) {
  return blogsArray[Math.floor(Math.random() * blogsArray.length)];
}

describe("blog list helper functions", () => {
  describe("getSumOfLikes", () => {
    test("return 0 with no blogs given", () => {
      const emptyBlogsList = [];
      assert.strictEqual(getSumOfLikes(emptyBlogsList), 0);
    });

    test("return correct number of likes likes for one blog", () => {
      const singleBlog = [getRandomBlog(blogsTestData)];
      const { likes } = singleBlog[0];
      assert.strictEqual(getSumOfLikes(singleBlog), likes);
    });

    test("return correct number of likes likes for many blogs", () => {
      const totalLikesInBlogsTestData = 36;
      assert.strictEqual(getSumOfLikes(blogsTestData), totalLikesInBlogsTestData);
    });
  });

  describe("getFavoriteBlog", () => {
    test("return null with no blogs given", () => {
      const emptyBlogsList = [];
      assert.strictEqual(getFavoriteBlog(emptyBlogsList), null);
    });

    test("return correctly formatted data for two blog list", () => {
      const sampleBlogs = [
        { title: "blog1", author: "author1", likes: 5 },
        { title: "blog2", author: "author2", likes: 6 },
      ];
      assert.deepStrictEqual(getFavoriteBlog(sampleBlogs), sampleBlogs[1]);
    });

    test("return correctly formatted data for many blogs list", () => {
      const blogWithMostLikes = blogsTestData[2];
      const sut = getFavoriteBlog(blogsTestData);

      assert.strictEqual(sut?.author, blogWithMostLikes.author);
      assert.strictEqual(sut?.title, blogWithMostLikes.title);
      assert.strictEqual(sut?.likes, blogWithMostLikes.likes);
    });
  });

  describe("getAuthorWithMostBlogs", () => {
    test("return null with empty blogs list", () => {
      const emptyBlogsList = [];
      assert.strictEqual(getAuthorWithMostBlogs(emptyBlogsList), null);
    });

    test("return correct author with one blog", () => {
      const testData = [{ author: "Edsger W. Dijkstra", nrBlogs: 1 }];
      const expected = {
        author: "Edsger W. Dijkstra",
        nrBlogs: 1,
      };
      assert.deepStrictEqual(getAuthorWithMostBlogs(testData), expected);
    });

    test("return correct author with multiple blogs", () => {
      const expected = {
        author: "Robert C. Martin",
        nrBlogs: 3,
      };
      assert.deepStrictEqual(getAuthorWithMostBlogs(blogsTestData), expected);
    });
  });
});
